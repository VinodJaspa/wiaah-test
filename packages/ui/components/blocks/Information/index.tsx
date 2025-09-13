import React, { FC } from "react";
import Link from "next/link";
import { information } from "@UI";
import { useTranslation } from "react-i18next";

export const Information: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="block w-full space-y-4">
      {/* Heading */}
      <p className="text-white font-bold uppercase">
        {t("Information")}
      </p>

      {/* Links */}
      <ul className="block space-y-4 text-sm text-gray-400">
        <li>
          <Link
            href={information.about_wiaah}
            className="hover:text-gray-300 transition-colors"
          >
            {t("About_Wiaah", "About Wiaah").toString()}
          </Link>
        </li>
        <li>
          <Link
            href={information.privacy_policy}
            className="hover:text-gray-300 transition-colors"
          >
            {t("Privacy_Policy", "Privacy Policy").toString()}
          </Link>
        </li>
        <li>
          <Link
            href={information.terms_and_conditions}
            className="hover:text-gray-300 transition-colors"
          >
            {t("Terms_Conditions", "Terms & Conditions").toString()}
          </Link>
        </li>
        <li>
          <Link
            href={information.delivery_information}
            className="hover:text-gray-300 transition-colors"
          >
            {t("Delivery Informations").toString()}
          </Link>
        </li>
      </ul>
    </div>
  );
};
