import { Link } from "@partials";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export const CustomerService: FC = () => {
  const { getUrl } = useRouting();
  const { t, i18n } = useTranslation();
  return (
    <div className="block w-full space-y-4">
      <span className="font-bold text-white uppercase">
        {t("Customer Service")}
      </span>
      <ul className="block space-y-4 text-sm text-gray-400">
        <li>
          <Link href={getUrl((r) => r.visitContactUs())}>
            {t("Contact Us")}
          </Link>
        </li>
        <li>
          <Link href={getUrl((r) => r.visitHelpAndFaqs())}>
            {t("Help and FAQs")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
