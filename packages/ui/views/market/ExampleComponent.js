import React from "react";
import { useTranslation } from "react-i18next";
import "./translations/i18n";

export const ExampleComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <p>
          <p></p>
          <p>
            {t("date_format_one", { date: new Date() })} ={" "}
            {t("keyWithCount", { count: 3 })}
          </p>
          <p>
            {t("date_format_two", { date: new Date() })} ={" "}
            {t("keyWithCount", { count: 1 })}
          </p>
        </p>
      </div>
    </div>
  );
};
