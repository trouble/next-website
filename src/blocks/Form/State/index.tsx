import * as React from 'react';
import { StateField } from 'payload-plugin-form-builder/dist/types';
import { Select } from '@root/forms/fields/Select';
import { Width } from '../Width';
import { stateOptions } from './options';

export const State: React.FC<StateField> = ({ width, name, required, label }) => {
  return (
    <Width width={width}>
      <Select
        path={name}
        required={required}
        label={label || ''}
        options={stateOptions}
      />
    </Width>
  )
}
