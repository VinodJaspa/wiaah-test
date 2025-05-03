import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  NewShippingSettings,
  SectionHeader,
  ShippingSettingsContext,
  ShippingSettingsRefProps,
} from "@UI";

export interface AddShippingMothedProps {}

export const AddNewShippingMothed: React.FC<AddShippingMothedProps> = ({}) => {
  const { cancelAddNew, editId } = useContext(ShippingSettingsContext);
const { t } = useTranslation();

  const ref = useRef<ShippingSettingsRefProps>(null);

  return (
    <div className="flex flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("Add New Shipping")}>
        <button
          onClick={() => ref.current?.submit && ref.current.submit()}
          className="w-fit self-end mt-4 mr-4 font-semibold"
        >
          {t("Add")}
        </button>
      </SectionHeader>
      <NewShippingSettings
        ref={ref}
        id={editId}
        onSuccess={() => {
          cancelAddNew();
        }}
      />
    </div>
  );
};
