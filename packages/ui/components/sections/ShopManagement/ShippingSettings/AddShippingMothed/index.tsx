import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, NewShippingSettings, SectionHeader } from "ui";

export interface AddShippingMothedProps {}

export const AddNewShippingMothed: React.FC<AddShippingMothedProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("add_new_shipping", "Add New Shipping")} />
      <NewShippingSettings />
    </div>
  );
};
