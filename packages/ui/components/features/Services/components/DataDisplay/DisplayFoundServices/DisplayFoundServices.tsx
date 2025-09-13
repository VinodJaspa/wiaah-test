import { useTranslation } from "react-i18next";
import React from "react";
export const DisplayFoundServices: React.FC<{
  location: string;
  servicesNum: number;
}> = ({ location, servicesNum }) => {
const { t } = useTranslation();
  return (
    <>
      {typeof location === "string" ? (
        <p className="text-sm font-bold mb-4">
          {t("We found for you in")} {location} {servicesNum || 0}{" "}
          {t(
            "booking services that are available just for you. Do not hesitate to book."
          )}
        </p>
      ) : null}
    </>
  );
};
