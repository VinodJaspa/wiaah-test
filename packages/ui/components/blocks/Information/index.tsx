import React, { FC } from "react";
import Link from "next/link";
import { information } from "@UI";
import { useTranslation } from "react-i18next";
export const Information: FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="block w-full space-y-4">
      <div className="text-primary font-bold uppercase">{t("Information")}</div>
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
        <li>
          <Link href={information.delivery_information}>
            {t("Delivery Informations")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
