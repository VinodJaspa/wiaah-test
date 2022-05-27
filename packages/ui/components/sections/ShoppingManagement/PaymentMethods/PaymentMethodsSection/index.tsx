import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdPayment } from "react-icons/md";
import {
  FormikInput,
  Button,
  Checkbox,
  Select,
  SelectOption,
  SectionHeader,
  SelectProps,
} from "ui";
import * as yup from "yup";
import { randomNum } from "../../../../helpers";

const paymentValidationSchema = yup.object().shape({});

export const PaymentMethodsSection: React.FC = () => {
  const { t } = useTranslation();
  const [addNew, setAddNew] = React.useState<boolean>(true);
  const [addNewInitial, setAddNewInitial] = React.useState({});
  return (
    <div className="flex flex-col w-full gap-6">
      <SectionHeader sectionTitle={t("payment_methods", "Payment Methods")} />
      <div className="flex gap-2 items-start">
        <span className="items-end flex gap-2 text-4xl font-semibold">
          <MdPayment />
          {t("credit", "Credit")}/{t("debit", "Debit")} {t("cards", "Cards")}
        </span>
        {paymentProdviders.map((provider, i) => (
          <img className="h-14 w-auto" src={provider} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {PaymentCardDetials.map((info, i) => (
          <PaymentCard key={i} cardInfo={info} />
        ))}
      </div>
      {!addNew && (
        <div className="flex w-full justify-end">
          <Button onClick={() => setAddNew(true)}>
            {t("add_new", "Add New")}
          </Button>
        </div>
      )}
      {addNew && (
        <Formik
          validationSchema={paymentValidationSchema}
          initialValues={addNewInitial}
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
                <FormikInput<SelectProps>
                  onOptionSelect={(value) =>
                    setFieldValue("expiryMonth", value)
                  }
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

interface PaymentCardDetials {
  cardId: string;
  cardLastNumbers: number;
  expirationDate: {
    month: number;
    year: number;
  };
}

const PaymentCardDetials: PaymentCardDetials[] = [
  {
    cardId: `${randomNum(1561324355)}`,
    cardLastNumbers: 1232,
    expirationDate: {
      year: 2021,
      month: randomNum(12),
    },
  },
  {
    cardId: `${randomNum(1561324355)}`,
    cardLastNumbers: 1232,
    expirationDate: {
      year: 2021,
      month: randomNum(12),
    },
  },
  {
    cardId: `${randomNum(1561324355)}`,
    cardLastNumbers: 1232,
    expirationDate: {
      year: 2021,
      month: randomNum(12),
    },
  },
];

interface PaymentCardProps {
  cardInfo: PaymentCardDetials;
  onEdit?: (cardInfo: PaymentCardDetials) => any;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ cardInfo, onEdit }) => {
  const { t } = useTranslation();
  return (
    <div className="gap-2 p-1 text-xl rounded flex flex-col w-[min(100%,30rem)] bg-gray-200">
      <div className="h-[3em] px-2 flex gap-4">
        {paymentCardProviders.map((src, i) => (
          <img className="h-full w-auto" src={src} />
        ))}
      </div>
      <div className="p-2 bg-white rounded">
        <div className="grid grid-cols-2 gap-2 w-fit">
          <div className="flex flex-col text-gray-500">
            {t("card_number", "Card Number")}
            <span className="font-bold text-black">
              {CardNumber({ lastNumbers: cardInfo.cardLastNumbers })}
            </span>
          </div>
          <span
            onClick={() => onEdit && onEdit(cardInfo)}
            className="h-fit w-fit text-primary cursor-pointer"
          >
            {t("edit", "Edit")}
          </span>
          <div className="flex flex-col text-gray-500">
            {t("expiration_date", "Expiration Date")}
            <span className="font-bold text-black">
              {cardInfo.expirationDate.month} {cardInfo.expirationDate.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardNumber = ({ lastNumbers }: { lastNumbers: number }) => {
  return `***********${lastNumbers}`;
};

const paymentCardProviders: string[] = paymentProdviders.concat([
  "/discover.svg",
]);
