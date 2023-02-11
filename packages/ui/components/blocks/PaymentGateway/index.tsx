import React, { FormEvent } from "react";
import { Button, SpinnerFallback, useGetCheckoutPaymentIntentQuery } from "@UI";
import { useTranslation } from "react-i18next";
import { EnvVars } from "@const";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${EnvVars.domain}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe}>
        {t("Submit")}
      </Button>
      {/* Show error message to your customers */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </form>
  );
};
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(EnvVars.stripePublicKey);

export interface PaymentGatewayProps {}

export const PaymentGateway: React.FC<PaymentGatewayProps> = () => {
  const { t } = useTranslation();

  const [clientSecret, setClientSecret] = React.useState<string>();

  const { mutate, isLoading, isError } = useGetCheckoutPaymentIntentQuery();

  React.useEffect(() => {
    mutate(
      {},
      {
        onSuccess(data, variables, context) {
          setClientSecret(data.client_secret);
        },
      }
    );
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </SpinnerFallback>
  );
};
