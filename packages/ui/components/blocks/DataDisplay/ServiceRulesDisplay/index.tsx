import React from "react";
import { HStack, NotAllowedIcon, CreditCardIcon, CashPaymentIcon } from "ui";
import { ServiceRules } from "types";
import { useTranslation } from "react-i18next";

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
      {payment === "online" ? (
        <HStack>
          <CreditCardIcon />
          <p>{t("Online Payment")}</p>
        </HStack>
      ) : payment === "cash" ? (
        <HStack>
          <CashPaymentIcon />
          <p>{t("Cash Payment")}</p>
        </HStack>
      ) : null}
    </div>
  );
};
