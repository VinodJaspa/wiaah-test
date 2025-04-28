import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";
import { PriceDisplay } from "@UI";

export interface CashbackBadgeProps {
  type?: "cash" | "percent";
  amount?: number;
  props?: HtmlDivProps;
}

export const CashbackBadge: React.FC<CashbackBadgeProps> = ({
  amount = 0,
  type = "cash",
  props,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <span
      {...props}
      className={`${props ? props.className || "" : ""
        } md:px-4 px-1 md:gap-2 gap-0.5 py-1 flex flex-nowrap md:rounded-lg rounded text-white bg-[#3CD399] whitespace-nowrap`}
    >
      {type === "cash" ? (
        <PriceDisplay price={amount} />
      ) : (
        <span>{`${amount}%`}</span>
      )}{" "}
      {t("Cashback")}
    </span>
  );
};
