import { RichText, RichTextType } from '@components/RichText';
import * as React from 'react';
import classes from './index.module.scss';
import { BlockContainer } from '@root/layout/BlockContainer';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { BackgroundColor } from '@components/BackgroundColor';
import Form from '@root/forms/Form';
import { fields } from './fields';
import Submit from '@root/forms/Submit';
import { Data } from '@root/forms/types';
import { useRouter } from 'next/router';
import { formatSlug } from '@root/utilities/formatSlug';
import { BlockID } from '@components/BlockID';
import { Form as FormType } from 'payload-plugin-form-builder/dist/types';
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { PaymentRecap } from './PaymentRecap';

export type EmbeddedFormType = {
  blockType?: 'embeddedForm'
  blockName?: string
  form: FormType
  richText?: RichTextType
}

export const EmbeddedForm: React.FC<EmbeddedFormType & {
  id?: string,
}> = (props) => {
  const {
    id,
    richText,
    form,
    form: {
      id: formID,
      submitButtonLabel,
      confirmationType,
      redirect,
      confirmationMessage
    },
    blockName
  } = props;

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>();
  const [error, setError] = React.useState<{ status?: string, message: string } | undefined>();
  const router = useRouter();

  const onSubmit = React.useCallback((data: Data) => {
    let loadingTimerID: NodeJS.Timer;

    const submitForm = async () => {
      setError(undefined);

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value
      }));

      // delay loading indicator by 1s
      loadingTimerID = setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      const cardInForm = elements?.getElement(CardElement);
      // validate payments before continuing
      // the card element must still be rendered on the page
      // stripe is NOT charging the card here
      let stripeTokenID: string = '';

      if (cardInForm) {
        const tokenResult = await stripe?.createToken(cardInForm, {
          name: data.nameOnCard as string,
          address_line1: data['billingAddress.line1'] as string,
          address_line2: data['billingAddress.line2'] as string,
          address_city: data['billingAddress.city'] as string,
          address_state: data['billingAddress.state'] as string,
          address_zip: data['billingAddress.zip'] as string,
        });

        const {
          error: stripeError,
          token
        } = tokenResult || {};

        if (stripeError) {
          clearTimeout(loadingTimerID);
          setIsLoading(false);
          setError({
            status: '500',
            message: stripeError.message || '',
          });
          return;
        }

        stripeTokenID = token?.id || '';
      }

      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/form-submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
            stripeTokenID,
          })
        })

        const res = await req.json();

        clearTimeout(loadingTimerID);

        if (req.status >= 400) {
          setIsLoading(false);
          setError({
            status: res.status,
            message: res.errors?.[0]?.message || 'Internal Server Error',
          });

          return;
        }

        setIsLoading(false);
        setHasSubmitted(true);

        if (confirmationType === 'redirect' && redirect) {
          const {
            type,
            reference,
            url
          } = redirect;

          let redirectUrl = '';

          if (type === 'custom') redirectUrl = url;

          if (type === 'reference' && reference) {
            redirectUrl = formatSlug(reference);
          };

          if (redirectUrl) router.push(redirectUrl);
        }
      } catch (err) {
        console.warn(err);
        setIsLoading(false);
        setError({
          message: 'Something went wrong.'
        });
      }
    }

    submitForm();
  }, [
    router,
    formID,
    redirect,
    confirmationType,
    stripe,
    elements
  ]);

  return (
    <div
      className={classes.formBlock}
      id={`block-${id}`}
    >
      <BlockID id={blockName || id} />
      {richText && (
        <BlockContainer>
          <RichText content={richText} />
        </BlockContainer>
      )}
      <div className={classes.formWrap}>
        <BlockContainer>
          <Grid>
            <Cell
              cols={9}
              className={classes.formCell}
            >
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText content={confirmationMessage} />
              )}
              {isLoading && !hasSubmitted && (
                <p>
                  Loading, please wait...
                </p>
              )}
              {error && (
                <div>
                  {`${error.status || '500'}: ${error.message || ''}`}
                </div>
              )}
              {!hasSubmitted && (
                <Form
                  onSubmit={onSubmit}
                  preventDefault
                >
                  <div className={classes.fieldWrap}>
                    {form && form.fields.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType];
                      if (Field) {
                        return (
                          <Field
                            key={index}
                            form={form}
                            {...field}
                          />
                        )
                      }
                      return null;
                    })}
                  </div>
                  <PaymentRecap
                    form={form}
                  />
                  <Submit
                    processing={isLoading}
                    label={submitButtonLabel}
                  />
                </Form>
              )}
            </Cell>
          </Grid>
        </BlockContainer>
        <Grid className={classes.bgGrid}>
          <Cell
            className={classes.bgCell}
            start={6}
            cols={11}
          >
            <BackgroundColor
              color="light-gray"
              className={classes.bg}
            />
          </Cell>
        </Grid>
      </div>
    </div>
  )
}
