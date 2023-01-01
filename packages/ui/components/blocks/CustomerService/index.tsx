import { FC } from "react";
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
        <li>{t("Contact Us")}</li>
        <li>{t("Help and FAQs")}</li>
      </ul>
    </div>
  );
};
