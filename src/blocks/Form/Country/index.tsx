import * as React from 'react';
import { CountryField } from 'payload-plugin-form-builder/dist/types';
import { Select } from '@root/forms/fields/Select';
import { Width } from '../Width';
import { countryOptions } from './options';

export const Country: React.FC<CountryField> = ({ width, name, required, label }) => {
  return (
    <Width width={width}>
      <Select
        path={name}
        required={required}
        label={label || ''}
        options={countryOptions}
      />
    </Width>
  )
}
