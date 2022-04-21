import * as React from 'react';
import { PaymentField } from 'payload-plugin-form-builder/dist/types';
import { Width } from '../Width';
import { CardElement } from '@stripe/react-stripe-js';
import classes from './index.module.scss';

export const Payment: React.FC<PaymentField> = (props) => {
  const {
    width,
    label,
  } = props;

  return (
    <Width width={width}>
      <div>
        {label}
      </div>
      <div className={classes.cardWrapper}>
        <CardElement
          className={classes.cardElement}
        />
      </div>
    </Width>
  )
}
