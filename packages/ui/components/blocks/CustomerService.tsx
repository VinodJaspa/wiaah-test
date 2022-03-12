import { FC } from "react";
import { customer_service } from "../../../../apps/market/lib/Links";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export const CustomerService: FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="block w-full space-y-4">
      <p className="font-bold uppercase text-green-300">
        {t("Customer_Service", "Customer Service")}
      </p>
      <ul className="block space-y-4 text-sm text-gray-400">
        <li>
          <Link href={customer_service.contact_us}>
            {t("Contact_Us", "Contact Us")}
          </Link>
        </li>
        <li>
          <Link href={customer_service.contact_us}>
            {t("Help_and_FAQs", "Help and FAQs")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
