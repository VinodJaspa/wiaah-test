import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdPayment } from "react-icons/md";
import { SectionHeader } from "ui";
import { FormikInput } from "../../../../blocks";
import { Button, Checkbox, Select, SelectOption } from "../../../../partials";
import * as yup from "yup";

const paymentValidationSchema = yup.object().shape({});

export const PaymentMethodsSection: React.FC = () => {
  const { t } = useTranslation();
  const [addNew, setAddNew] = React.useState<boolean>(true);
  return (
    <div className="flex flex-col w-full gap-6">
      <SectionHeader
        sectionTitle={{
          translationKey: "payment_methods",
          fallbackText: "Payment Methods",
        }}
      />
      <div className="flex gap-2 items-start">
        <span className="items-end flex gap-2 text-4xl font-semibold">
          <MdPayment />
          {t("credit", "Credit")}/{t("debit", "Debit")} {t("cards", "Cards")}
        </span>
        {paymentProdviders.map((provider, i) => (
          <img className="h-14 w-auto" src={provider} />
        ))}
      </div>
      <div className="flex w-full justify-end">
        <Button onClick={() => setAddNew(true)}>
          {t("add_new", "Add New")}
        </Button>
      </div>
      {addNew && (
        <Formik
          validationSchema={paymentValidationSchema}
          initialValues={{}}
          onSubmit={() => setAddNew(false)}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="grid grid-cols-2 gap-8">
                <FormikInput
                  placeholder={t("card_number", "Card Number")}
                  name="cardNumber"
                />
                <FormikInput
                  placeholder={t("card_holder_name", "Card Holder Name")}
                  name="cardHolderName"
                />
                <FormikInput
                  as={Select}
                  placeholder={t("expiry_month", "Expiry Month")}
                  name="expiryMonth"
                >
                  {[...Array(12)].map((_, i) => (
                    <SelectOption value={i + 1}>{i + 1}</SelectOption>
                  ))}
                </FormikInput>
                <FormikInput
                  placeholder={t("expiry_year", "Expiry Year")}
                  name="expiryYear"
                />
                <div className="flex items-center gap-2">
                  <Checkbox
                    onChange={(e) =>
                      setFieldValue("setDefault", e.target.checked)
                    }
                  />
                  {t("set_as_default_payment", "Set As Default Payment")}
                </div>
                <div className="w-full flex justify-end">
                  <Button type="submit" className="w-fit">
                    {t("submit", "Submit")}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

const paymentProdviders: string[] = [
  "/visa.svg",
  "/mastercard.svg",
  "/american_express.svg",
];
