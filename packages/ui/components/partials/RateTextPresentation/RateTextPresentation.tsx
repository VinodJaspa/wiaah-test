import React from "react";
import { useTranslation } from "react-i18next";

export interface RateTextPresentationProps {
  rate: number;
}

export const RateTextPresentation: React.FC<RateTextPresentationProps> = ({
  rate,
}) => {
  const { t } = useTranslation();
  return (
    <span className="font-bold ">
      {rate < 3
        ? t("Considerable")
        : rate < 4
        ? t("Good")
        : rate < 5
        ? t("Fabulous")
        : rate === 5
        ? t("Excellent")
        : t("Bad")}
    </span>
  );
};
