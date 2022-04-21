import * as React from 'react';
import { CheckboxField } from 'payload-plugin-form-builder/dist/types';
import { Checkbox as CheckboxFormField } from '@root/forms/fields/Checkbox';
import { Width } from '../Width';

export const Checkbox: React.FC<CheckboxField> = ({ width, name, required, label }) => {
  return (
    <Width width={width}>
      <CheckboxFormField
        path={name}
        required={required}
        label={label || ''}
      />
    </Width>
  )
}
