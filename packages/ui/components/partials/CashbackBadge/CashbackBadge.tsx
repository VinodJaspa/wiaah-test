import { CashbackData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";
import { PriceDisplay } from "ui";

export interface CashbackBadgeProps extends CashbackData {
  props?: HtmlDivProps;
}

export const CashbackBadge: React.FC<CashbackBadgeProps> = ({
  amount,
  type,
  props,
}) => {
  const { t } = useTranslation();
  return (
    <span
      {...props}
      className={`${
        props ? props.className || "" : ""
      } px-4 py-1 flex flex-nowrap rounded text-white bg-red-500 whitespace-nowrap`}
    >
      {type === "cash" ? (
        <PriceDisplay priceObject={{ amount }} />
      ) : (
        <span>{`${amount}%`}</span>
      )}{" "}
      {t("Cashback")}
    </span>
  );
};
