import React, { FC } from "react";
import Link from "next/link";
import { information } from "../../../../../apps/market/lib/Links";
import { useTranslation } from "react-i18next";
export const Information: FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="block w-full space-y-4">
      <p className="font-bold uppercase text-green-300">
        {t("Information", "Information")}
      </p>
      <ul className="block space-y-4 text-sm text-gray-400">
        <li>
          <Link href={information.about_wiaah}>
            {t("About_Wiaah", "About Wiaah")}
          </Link>
        </li>
        <li>
          <Link href={information.privacy_policy}>
            {t("Privacy_Policy", "Privacy Policy")}
          </Link>
        </li>
        <li>
          <Link href={information.terms_and_conditions}>
            {t("Terms_Conditions", "Terms & Conditions")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
