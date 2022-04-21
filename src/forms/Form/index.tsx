import React, {
  useEffect, useRef, useState, useCallback, useReducer, ChangeEvent,
} from 'react';
import reduceFieldsToValues from './reduceFieldsToValues';
import reducer from './reducer';
import initialContext from './initialContext';

import { SubmittedContext, ProcessingContext, ModifiedContext, FormContext, FieldContext } from './context';

import { IContext, Field, OnSubmit, InitialState } from '../types';
import { useNotifications } from '@root/providers/Notifications';

const defaultInitialState = {};

const Form: React.FC<{
  onSubmit?: OnSubmit
  children: React.ReactNode
  initialState?: InitialState
  method?: 'GET' | 'POST'
  action?: string
  className?: string
  preventDefault?: boolean
}> = (props) => {
  const {
    onSubmit,
    children,
    initialState = defaultInitialState,
    method,
    action,
    className,
    preventDefault = true,
  } = props;

  const [fields, dispatchFields] = useReducer(reducer, initialState);
  const [modified, setModified] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contextRef = useRef<IContext>(initialContext);

  contextRef.current.initialState = initialState;
  contextRef.current.fields = fields;
  const { setNotification } = useNotifications();

  const submit = useCallback(async (e: ChangeEvent<HTMLFormElement>) => {
    setSubmitted(true);
    setProcessing(true);

    if (processing) {
      e.preventDefault();
      e.stopPropagation();
    }

    const isValid = contextRef.current.validateForm();

    // If not valid, prevent submission
    if (!isValid) {
      e.preventDefault();

      setNotification({
        id: 'formError',
        message: 'Please check your submission and try again.'
      })

      setProcessing(false);
      return false;
    }

    if (typeof onSubmit === 'function') {

      if (preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      }
      await onSubmit(reduceFieldsToValues(fields, false), reduceFieldsToValues(fields, true));
      setSubmitted(false);
      setProcessing(false);
      setModified(false);
    }

    return false;
  }, [
    fields,
    onSubmit,
    processing,
    preventDefault,
    setNotification
  ]);

  const getFields = useCallback(() => contextRef.current.fields, [contextRef]);
  const getField = useCallback((path: string): Field => contextRef.current.fields[path], [contextRef]);
  const getData = useCallback(() => reduceFieldsToValues(contextRef.current.fields, true), [contextRef]);
  const validateForm = useCallback(() => !Object.values(contextRef.current.fields).some((field): boolean => field.valid === false), [contextRef]);

  contextRef.current.dispatchFields = dispatchFields;
  contextRef.current.submit = submit;
  contextRef.current.getFields = getFields;
  contextRef.current.getField = getField;
  contextRef.current.getData = getData;
  contextRef.current.validateForm = validateForm;
  contextRef.current.setModified = setModified;
  contextRef.current.setProcessing = setProcessing;
  contextRef.current.setSubmitted = setSubmitted;

  useEffect(() => {
    contextRef.current = { ...initialContext };
    dispatchFields({ type: 'REPLACE_STATE', state: initialState });
  }, [initialState]);

  return (
    <form
      method={method}
      action={action}
      noValidate
      onSubmit={contextRef.current.submit}
      className={className}
    >
      <FormContext.Provider value={contextRef.current}>
        <FieldContext.Provider value={{
          ...contextRef.current,
        }}
        >
          <SubmittedContext.Provider value={submitted}>
            <ProcessingContext.Provider value={processing}>
              <ModifiedContext.Provider value={modified}>
                {children}
              </ModifiedContext.Provider>
            </ProcessingContext.Provider>
          </SubmittedContext.Provider>
        </FieldContext.Provider>
      </FormContext.Provider>
    </form>
  );
};

export default Form;
