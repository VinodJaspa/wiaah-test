import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { MdPayment } from "react-icons/md";
import {
  Button,
  SectionHeader,
  Input,
  VisaIcon,
  MasterCardIcon,
  DiscoverCreditCardIcon,
  AmericanExpressCreditCardIcon,
  HStack,
} from "@UI";
import { mapArray, randomNum } from "utils";

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
      {addNew && <PaymentMethodForm></PaymentMethodForm>}
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

  const paymentMethods: {
    icon: ReactElement;
  }[] = [
    {
      icon: <VisaIcon />,
    },
    {
      icon: <MasterCardIcon />,
    },
    {
      icon: <DiscoverCreditCardIcon />,
    },
    {
      icon: <AmericanExpressCreditCardIcon />,
    },
  ];

  return (
    <div className="gap-2 p-1 text-xl rounded flex flex-col w-[min(100%,30rem)] bg-gray-200">
      <div className="text-lg px-2 flex gap-4">
        {mapArray(paymentMethods, (v, i) => (
          <React.Fragment key={i}>{v}</React.Fragment>
        ))}
      </div>
      <div className="p-2 bg-white rounded">
        <div className="grid grid-cols-2 gap-2 w-fit">
          <div className="flex flex-col text-gray-500">
            {t("Card Number")}
            <span className="font-bold text-black">
              {CardNumber({ lastNumbers: cardInfo.cardLastNumbers })}
            </span>
          </div>
          <span
            onClick={() => onEdit && onEdit(cardInfo)}
            className="h-fit w-fit text-primary cursor-pointer"
          >
            {t("Edit")}
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

export const PaymentMethodForm = React.forwardRef(
  (props: { onSuccess: () => any }, ref) => {
    const { t } = useTranslation();

    React.useImperativeHandle(ref, () => ({
      submit: () => {},
    }));

    const paymentMethods: {
      icon: ReactElement;
    }[] = [
      {
        icon: <VisaIcon />,
      },
      {
        icon: <MasterCardIcon />,
      },
      {
        icon: <DiscoverCreditCardIcon />,
      },
      {
        icon: <AmericanExpressCreditCardIcon />,
      },
    ];

    return (
      <div className="rounded-md flex flex-col gap-3 py-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <span className="text-xl font-semibold">{t("Card Details")}</span>
          <HStack className="flex-wrap text-lg">
            {mapArray(paymentMethods, (v, i) => (
              <React.Fragment key={i}>{v.icon}</React.Fragment>
            ))}
          </HStack>
        </div>

        <p className="font-medium">
          {t("Card type")}:
          <span className="font-normal">
            {t("Debit")} / {t("Credit")}
          </span>
        </p>

        <div className="mt-4">
          <label htmlFor="">{t("Card Number")}</label>
          <Input
            className="mt-2 mb-4 rounded-md border-gray-300"
            placeholder="2222 2222 2222 2222"
            name="name-on-card"
            id="name-on-card"
            type="text"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="mr-2 w-6/12">
            <label>{t("Expiry Date")}</label>
            <Input
              className="mt-2 mb-4 rounded-md border-gray-300"
              placeholder="MM/YY"
              name="name-on-card"
              id="name-on-card"
              type="text"
            />
          </div>
          <div className="ml-2 w-6/12">
            <label htmlFor="">CVC/CVV</label>
            <Input
              className="mt-2 mb-4 rounded-md border-gray-300"
              placeholder="123"
              name="name-on-card"
              id="name-on-card"
              type="text"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>{t("Add")}</Button>
        </div>
      </div>
    );
  }
);
