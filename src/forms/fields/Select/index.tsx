import React, { useCallback } from 'react';
import ReactSelect, { SingleValue } from 'react-select';
import useFieldType from '../../useFieldType';
import Label from '../../Label';
import Error from '../../Error';
import { Validate } from "@root/forms/types"
import classes from './index.module.scss';

type Option = {
  label: string
  value: any
}

type ValidateOptions = {
  required?: boolean
  options: Option[]
}

const defaultValidate = (value: string, options: ValidateOptions): string | true => {
  if (typeof value === 'string' && !options.options.find((option) => option && option.value === value)) {
    return 'This field has an invalid selection';
  }

  if (options.required && !value) {
    return 'This field is required.';
  }

  return true;
};

export const Select: React.FC<{
  path: string
  required?: boolean
  label?: string
  options: Option[]
  validate?: Validate
  onChange?: (value: string) => void // eslint-disable-line no-unused-vars
  marginBottom?: boolean
}> = (props) => {
  const {
    path,
    required,
    validate = defaultValidate,
    label,
    options,
    onChange,
    marginBottom
  } = props;

  const memoizedValidate = useCallback((value: unknown) => {
    const validationResult = validate(
      value as string,
      {
        required,
        options
      }
    );
    return validationResult;
  }, [validate, required, options]);

  const {
    value,
    showError,
    setValue,
    errorMessage,
  } = useFieldType({
    path,
    validate: memoizedValidate,
  });

  const handleChange = useCallback((selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setValue(selectedOption.value);
      if (typeof onChange === 'function') onChange(selectedOption.value)
    }
  }, [
    onChange,
    setValue
  ])

  const valueToRender = options.find((option) => option.value === value) || null;

  return (
    <div
      className={[
        classes.select,
        showError && classes.error,
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
      <ReactSelect
        onChange={handleChange}
        value={valueToRender}
        options={options}
        className={classes.reactSelect}
        classNamePrefix="rs"
      />
    </div>
  );
};
