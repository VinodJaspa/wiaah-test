import { SectionHeader } from "@sections/ShoppingManagement";
import React from "react";
import { useTranslation } from "react-i18next";

export const PrivacyPolicyView: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Privacy Policy")} />

      <></>
    </div>
  );
};
