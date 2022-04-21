import * as React from 'react';
import { SelectField } from 'payload-plugin-form-builder/dist/types';
import { Select as SelectFormField } from '@root/forms/fields/Select';
import { Width } from '../Width';

export const Select: React.FC<SelectField> = ({ width, name, required, label, options }) => {
  return (
    <Width width={width}>
      <SelectFormField
        path={name}
        required={required}
        label={label || ''}
        options={options}
      />
    </Width>
  )
}
