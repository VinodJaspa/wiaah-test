import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, NewShippingSettings } from "ui";

export interface AddShippingMothedProps {}

export const AddNewShippingMothed: React.FC<AddShippingMothedProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-3 w-full">
        <p className="text-4xl ">{t("add_new_shipping", "Add New Shipping")}</p>
        <Divider className="border-primary" />
      </div>
      <NewShippingSettings />
    </div>
  );
};
