import * as React from 'react';
import { TextField } from 'payload-plugin-form-builder/dist/types';
import { Text as TextFormField } from '@root/forms/fields/Text';
import { Width } from '../Width';

export const Text: React.FC<TextField> = ({ width, name, required, label }) => {
  return (
    <Width width={width}>
      <TextFormField
        path={name}
        required={required}
        label={label}
      />
    </Width>
  )
}
