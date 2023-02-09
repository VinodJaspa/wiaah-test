import React, { FormEvent } from "react";
import { Button, SpinnerFallback, useGetCheckoutPaymentIntentQuery } from "@UI";
import * as yup from "yup";
import { CardDetails } from "types";
import { useTranslation } from "react-i18next";
import { EnvVars } from "@UI/constants/envVars";
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
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(EnvVars.stripePublicKey);

const schema = yup.object().shape({
  expiryDate: yup.string().required("Expiry Date is required"),
  cardNumber: yup
    .string()
    .required("Card Number is required")
    .matches(/^\d+$/, "Card number should only have numbers")
    .min(14, "Card Number must be at least 14 numbers"),
  cvv: yup
    .string()
    .required("CVV Number is Required")
    .matches(/^\d+$/, "CVV number should only have numbers")
    .min(3, "CVV Number must be at least 3 numbers"),
});
export interface PaymentGatewayProps {
  onSuccess?: (cardDetails: CardDetails) => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  onSuccess,
}) => {
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

  return (
    <></>
    // <BoxShadow>
    //   <div className="bg-white">
    //     <div className="flex flex-col items-start gap-4 p-4">
    //       <div className="flex w-full items-center justify-between">
    //         <span id="PaymentTitle" className="text-3xl leading-loose">
    //           {t("payment", "Payment")}
    //         </span>
    //         <div className="flex h-12 items-center gap-2">
    //           <Image className="h-full" src="/visa.svg" />
    //           <Image className="h-full" src="/mastercard.svg" />
    //           <Image className="h-full" src="/amex.svg" />
    //           <Image className="h-full" src="/discover.png" />
    //           <Image className="h-full" src="/american_express.png" />
    //         </div>
    //       </div>
    //       <Formik
    //         validationSchema={schema}
    //         initialValues={{
    //           cardNumber: "",
    //           expiryDate: "",
    //           cvv: "",
    //         }}
    //         onSubmit={(res) => onSuccess && onSuccess(res)}
    //       >
    //         {({ errors, touched }) => (
    //           <Form className="w-full">
    //             <div className="w-full items-end gap-4 flex flex-col">
    //               <div className="w-full flex flex-col gap-2">
    //                 <span>{t("card_number", "Card Number")}</span>
    //                 <FormikInput
    //                   placeholder="1234...14"
    //                   id="CardNumberInput"
    //                   name="cardNumber"
    //                 />
    //               </div>
    //               <div className="w-full grid grid-cols-2 gap-4">
    //                 <div className="w-full flex flex-col gap-2">
    //                   <span>{t("expiry_date", "Expiry Date")}</span>
    //                   <FormikInput
    //                     id="CardExpiryDateInput"
    //                     placeholder="MM/YY"
    //                     name="expiryDate"
    //                   />
    //                 </div>
    //                 <div className="w-full gap-2 flex flex-col">
    //                   <span>{t("cvc/cvv", "CVC/CVV")}</span>
    //                   <FormikInput
    //                     id="CardCvvInput"
    //                     placeholder="1234"
    //                     name="cvv"
    //                     fullWidth
    //                   />
    //                 </div>
    //               </div>
    //               <Button
    //                 id="PayNowButton"
    //                 className="bg-black w-full px-8 py-2"
    //                 type="submit"
    //               >
    //                 {t("pay_now", "Pay now")}
    //               </Button>
    //             </div>
    //           </Form>
    //         )}
    //       </Formik>
    //     </div>
    //   </div>
    // </BoxShadow>
  );
};
