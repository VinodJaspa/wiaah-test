import Link from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export const CustomerService: FC = () => {
  const { getUrl } = useRouting();
  const { t } = useTranslation();

  return (
    <div className="block w-full space-y-4 ml-4">
      {/* Heading */}
      <p className="text-white font-semibold text-lg">
        {t("Customer service")}
      </p>

      {/* Links */}
      <ul className="block space-y-4 text-sm text-gray-400">
        <li>
          <Link
            href={getUrl((r) => r.visitContactUs())}
            className="hover:text-gray-300 transition-colors"
          >
            {t("Contact us")}
          </Link>
        </li>
        <li>
          <Link
            href={getUrl((r) => r.visitHelpAndFaqs())}
            className="hover:text-gray-300 transition-colors"
          >
            {t("Help and FAQs")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
