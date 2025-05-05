import { SectionHeader } from "@sections/ShoppingManagement";
import React from "react";
import { useTranslation } from "react-i18next";

export const PrivacyPolicyView: React.FC = () => {
const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Privacy Policy")} />

      <></>
    </div>
  );
};
