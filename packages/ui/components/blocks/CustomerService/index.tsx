import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@partials";

export const CustomerService: FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="block w-full space-y-4">
      <span className="font-bold text-primary uppercase">
        {t("Customer_Service", "Customer Service")}
      </span>
      <ul className="block space-y-4 text-sm text-gray-400">
        <li>
          <Link href={""}>{t("Contact Us")}</Link>
        </li>
        <li>
          <Link href={""}>{t("Help and FAQs")}</Link>
        </li>
      </ul>
    </div>
  );
};
