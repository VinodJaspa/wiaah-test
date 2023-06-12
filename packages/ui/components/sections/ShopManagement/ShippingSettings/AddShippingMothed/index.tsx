import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  NewShippingSettings,
  SectionHeader,
  ShippingSettingsContext,
} from "@UI";

export interface AddShippingMothedProps {}

export const AddNewShippingMothed: React.FC<AddShippingMothedProps> = ({}) => {
  const { cancelAddNew, editId } = useContext(ShippingSettingsContext);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("add_new_shipping", "Add New Shipping")} />
      <NewShippingSettings
        id={editId}
        onSuccess={() => {
          cancelAddNew();
        }}
      />
    </div>
  );
};
