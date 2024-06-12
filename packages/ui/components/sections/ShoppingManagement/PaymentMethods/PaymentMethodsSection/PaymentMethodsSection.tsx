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
  useGetMyAccountQuery,
  useGetMyFinancialAccountsQuery,
  CardIntelIcon,
  useResponsive,
  RoundedPlusIcon,
} from "@UI";
import { FinancialAccountPlaceholder as FinData } from "placeholder";
import { mapArray, randomNum } from "utils";
export const PaymentMethodsSection: React.FC = () => {
  // Warning: grphql query endpoint is not ready yet so I replace it with placeholder once it's ready replace it back
  // const { data } = useGetMyAccountQuery();

  const data = { id: "33" };

  return data ? (
    <AccountPaymentMethodsSection
      accountId={data.id}
    ></AccountPaymentMethodsSection>
  ) : null;
};

export const AccountPaymentMethodsSection: React.FC<{ accountId: string }> = ({
  accountId,
}) => {
  const { t } = useTranslation();
  const [addNew, setAddNew] = React.useState<boolean>(true);
  const { isMobile } = useResponsive();

  // Warning: grphql query endpoint is not ready yet so I replace it with placeholder once it's ready replace it back
  // const { data } = useGetMyFinancialAccountsQuery();

  return isMobile ? (
    <div className="flex flex-col p-9 gap-4">
      <SectionHeader sectionTitle={t("Payment methods")} />

      <div className="flex flex-col w-full h-full overflow-y-scroll noScroll gap-4">
        {mapArray(FinData, (item) => (
          <ColouredPaymentCard
            last4={parseInt(item.cardLast4!)}
            expiryMonth={parseInt(item.card_exp_month!)}
            expiryYear={parseInt(item.card_exp_year!)}
          />
        ))}
      </div>

      <Button colorScheme="darkbrown" onClick={() => setAddNew(true)}>
        <HStack>
          <RoundedPlusIcon />
          <p>{t("Create new method")}</p>
        </HStack>
      </Button>
    </div>
  ) : (
    <div className="flex flex-col w-full gap-6">
      <SectionHeader sectionTitle={t("Payment Methods")} />
      <div className="flex gap-2 items-start">
        <span className="items-end flex gap-2 text-4xl font-semibold">
          <MdPayment />
          {t("Credit")}/{t("Debit")} {t("Cards")}
        </span>
        {paymentProdviders.map((provider, i) => (
          <img key={i} className="h-14 w-auto" src={provider} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {PaymentCardDetials.map((info, i) => (
          <PaymentCard key={i} cardInfo={info} />
        ))}
      </div>
      {!addNew && (
        <div className="flex w-full justify-end">
          <Button onClick={() => setAddNew(true)}>{t("Add New")}</Button>
        </div>
      )}
      {addNew && <PaymentMethodForm onSuccess={() => { }}></PaymentMethodForm>}
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

  const paymentMethods: { icon: ReactElement }[] = [
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
          <React.Fragment key={i}>{v.icon}</React.Fragment>
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
      submit: () => { },
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

export const ColouredPaymentCard: React.FC<{
  last4: number;
  expiryMonth: number;
  expiryYear: number;
}> = ({ expiryMonth, expiryYear, last4 }) => {
  const { t } = useTranslation();
  return (
    <div className="flex rounded-2xl flex-col w-full gap-10">
      <HStack className="justify-between">
        <CardIntelIcon className="text-4xl" />
        <VisaIcon />
      </HStack>
      <p className="text-2xl font-bold">
        {["****", "****", "****", `${last4}`].join(" ")}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2"></div>

        <div className="flex flex-col items-start gap-2">
          <p className="font-medium">{t("Expiry Date")}</p>
          <p className="text-xl font-medium">
            {`${expiryMonth > 9 ? expiryMonth : `0${expiryMonth}`}`}/
            {`${expiryYear - 2000}`}
          </p>
        </div>
      </div>
    </div>
  );
};
