export type StickyElement = {
  name: string
  height?: number
}

export type StickyElements = {
  [key: string]: StickyElement
}

export const stickyElementReducer = (
  state: StickyElements,
  action: {
    type: string,
    payload: StickyElement,
  }) => {
  let newState = {
    ...state
  };

  switch (action.type) {
    case 'ADD_STICKY_ELEMENT': {
      const {
        name,
      } = action.payload;

      newState = {
        ...newState,
        [name]: action.payload,
      }
      break;
    }
  }

  return newState
}
