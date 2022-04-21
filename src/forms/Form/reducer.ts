// no declaration file for flatley, and no @types either, so require instead of import
// import flatley from 'flatley';
const flatley = require('flatley');
const { flatten, unflatten } = flatley;
import { Field, Fields, Action } from '../types';

const flattenFilters = [{
  test: (_: Fields, value: Field) => {
    const hasValidProperty = Object.prototype.hasOwnProperty.call(value, 'valid');
    const hasValueProperty = Object.prototype.hasOwnProperty.call(value, 'value');

    return (hasValidProperty && hasValueProperty);
  },
}];

const unflattenRowsFromState = (state: Fields, path: string) => {
  // Take a copy of state
  const remainingFlattenedState = { ...state };

  const rowsFromStateObject: Fields = {};

  const pathPrefixToRemove = path.substring(0, path.lastIndexOf('.') + 1);

  // Loop over all keys from state
  // If the key begins with the name of the parent field,
  // Add value to rowsFromStateObject and delete it from remaining state
  Object.keys(state).forEach((key) => {
    if (key.indexOf(`${path}.`) === 0) {
      const name = key.replace(pathPrefixToRemove, '');
      rowsFromStateObject[name] = state[key];
      rowsFromStateObject[name].initialValue = rowsFromStateObject[name].value;

      delete remainingFlattenedState[key];
    }
  });

  const unflattenedRows = unflatten(rowsFromStateObject);

  return {
    unflattenedRows: unflattenedRows[path.replace(pathPrefixToRemove, '')] || [],
    remainingFlattenedState,
  };
};

function fieldReducer(state: Fields, action: Action): Fields {
  switch (action.type) {
    case 'REPLACE_STATE': {
      return action.state || {};
    }

    case 'REMOVE': {
      const newState = { ...state };
      delete newState[action.path];
      return newState;
    }

    case 'REMOVE_ROW': {
      const { rowIndex, path } = action;
      const { unflattenedRows, remainingFlattenedState } = unflattenRowsFromState(state, path);

      unflattenedRows.splice(rowIndex, 1);

      const flattenedRowState = unflattenedRows.length > 0 ? flatten({ [path]: unflattenedRows }, { filters: flattenFilters }) : {};

      return {
        ...remainingFlattenedState,
        ...flattenedRowState,
      };
    }

    default: {
      const newField = {
        value: action.value,
        valid: action.valid,
        errorMessage: action.errorMessage,
        initialValue: action.initialValue,
      };

      return {
        ...state,
        [action.path]: newField,
      };
    }
  }
}

export default fieldReducer;
