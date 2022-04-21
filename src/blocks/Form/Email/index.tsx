import * as React from 'react';
import { EmailField } from 'payload-plugin-form-builder/dist/types';
import { Text } from '@root/forms/fields/Text';
import { Width } from '../Width';

const validate = (value: string, options: { required?: boolean }) => {
  if ((value && !/\S+@\S+\.\S+/.test(value))
    || (!value && options.required)) {
    return 'Please enter a valid email address.';
  }

  return true;
}

export const Email: React.FC<EmailField> = ({ width, name, required, label }) => {
  return (
    <Width width={width}>
      <Text
        path={name}
        required={required}
        label={label}
        validate={(value) => validate(value as string, { required })}
      />
    </Width>
  )
}
