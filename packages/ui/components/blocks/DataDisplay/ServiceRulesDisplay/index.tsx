import React from "react";
import { HStack, NotAllowedIcon, CreditCardIcon, CashPaymentIcon } from "@UI";
import { ServiceRules } from "types";
import { useTranslation } from "react-i18next";
import { ServicePaymentMethod, ShopPaymentMethod } from "@features/API";

export interface ServiceRulesDisplayProps extends ServiceRules {}

export const ServiceRulesDisplay: React.FC<ServiceRulesDisplayProps> = ({
  payment,
  refundable,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {refundable === false ? (
        <HStack>
          <NotAllowedIcon />
          <p>{t("Non-refundable")}</p>
        </HStack>
      ) : null}
      {payment !== ServicePaymentMethod.Cash ? (
        <HStack>
          <CreditCardIcon />
          <p>{t("Online Payment")}</p>
        </HStack>
      ) : payment === ServicePaymentMethod.Cash ? (
        <HStack>
          <CashPaymentIcon />
          <p>{t("Cash Payment")}</p>
        </HStack>
      ) : null}
    </div>
  );
};
