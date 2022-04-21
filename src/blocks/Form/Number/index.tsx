import * as React from 'react';
import { SelectField } from 'payload-plugin-form-builder/dist/types';
import { Width } from '../Width';
import { NumberInput } from '@root/forms/fields/Number';

export const Number: React.FC<SelectField> = ({ width, name, required, label }) => {
  return (
    <Width width={width}>
      <NumberInput
        path={name}
        required={required}
        label={label}
      />
    </Width>
  )
}
