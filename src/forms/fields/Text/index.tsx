import React, { ChangeEvent, useCallback } from 'react';
import useFieldType from '../../useFieldType';
import Error from '../../Error';
import Label from '../../Label';
import { Validate } from '../../types';

import classes from './index.module.scss';

const defaultValidate: Validate = (val) => {
  const stringVal = val as string;
  const isValid = stringVal && stringVal.length > 0;

  if (isValid) {
    return true;
  }

  return 'Please enter a value.';
};

export const Text: React.FC<{
  path: string
  required?: boolean
  validate?: Validate
  label?: string
  placeholder?: string
  type?: 'text' | 'hidden'
  onChange?: (value: string) => void // eslint-disable-line no-unused-vars
  marginBottom?: boolean
}> = (props) => {
  const {
    path,
    required = false,
    validate = defaultValidate,
    label,
    placeholder,
    type = 'text',
    onChange,
    marginBottom
  } = props;

  const fieldType = useFieldType({
    path,
    validate: required ? validate : undefined,
  });

  const {
    value,
    showError,
    setValue,
    errorMessage,
  } = fieldType;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (typeof onChange === 'function') onChange(e.target.value)
  }, [
    onChange,
    setValue
  ])

  return (
    <div
      className={[
        classes.wrap,
        marginBottom === false && classes.noMarginBottom
      ].filter(Boolean).join(' ')}
    >
      <Error
        showError={showError}
        message={errorMessage}
      />
      <Label
        htmlFor={path}
        label={label}
        required={required}
      />
      <input
        className={classes.input}
        value={value as string || ''}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        id={path}
        name={path}
      />
    </div>
  );
};
