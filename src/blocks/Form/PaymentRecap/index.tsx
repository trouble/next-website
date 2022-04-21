import * as React from 'react';
import { FieldValues, Form, PaymentField } from 'payload-plugin-form-builder/dist/types';
import classes from './index.module.scss';
import { useFormFields } from '@root/forms/Form/context';
import { getPaymentTotal } from 'payload-plugin-form-builder/dist/utilities/getPaymentTotal';

export const PaymentRecap: React.FC<{
  form: Form
}> = (props) => {
  const {
    form
  } = props;

  const [paymentTotal, setPaymentTotal] = React.useState<number>();
  const { fields } = useFormFields();

  React.useEffect(() => {
    const keyValuePairs: FieldValues = {};
    Object.keys(fields).forEach((fieldName) => {
      keyValuePairs[fieldName] = fields[fieldName].value as string | number;
    });

    const paymentField = form.fields?.find((field) => field.blockType === 'payment');

    if (paymentField) {
      const {
        priceConditions,
        basePrice
      } = paymentField as PaymentField;

      const priceOfField = getPaymentTotal({
        basePrice,
        priceConditions,
        fieldValues: keyValuePairs
      });

      setPaymentTotal(priceOfField);
    }
  }, [
    fields,
    form
  ]);

  return (
    <div className={classes.paymentRecap}>
      <div className={classes.label}>
        {`Payment total:`}
      </div>
      <div className={classes.total}>
        {`$${paymentTotal?.toFixed(2) || ''}`}
      </div>
    </div>
  )
}
