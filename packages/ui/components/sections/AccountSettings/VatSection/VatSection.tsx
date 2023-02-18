import { SectionHeader } from "@sections/ShoppingManagement";
import { useTranslation } from "react-i18next";
import {
  AddressInputs,
  Button,
  Divider,
  Input,
  Radio,
  UpdateMyShopMutationVariables,
  useUpdateMyShopMutation,
} from "@UI";
import React from "react";

export const VatSection: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = React.useState<UpdateMyShopMutationVariables["args"]>(
    {}
  );

  const { mutate } = useUpdateMyShopMutation();

  return (
    <div className="flex flex-col w-full">
      <SectionHeader sectionTitle={t("Vat Settings")}></SectionHeader>
      <div className=" flex flex-col gap-4">
        <p className="text-2xl font-semibold">{t("Type of seller")}</p>
        <div className="text-xl">
          <Radio checked name="type_of_seller" disabled>
            {t("Individual")}
          </Radio>
          <Radio name="type_of_seller" disabled>
            {t("Professional")}
          </Radio>
        </div>
      </div>
      <Divider />
      <AddressInputs
        onChange={(d) => {
          setForm((e) => ({
            ...e,
            vat: {
              ...e?.vat,
              location: {
                ...d,
                state: d.city,
              },
            },
          }));
        }}
        askBillingAddress={false}
        askShippingAddress={false}
      />

      <Divider />
      <div className="flex flex-col gap-4">
        <p className="font-bold text-xl">{t("VAT ID")}</p>
        <p>
          {t(
            "VAT IDs typically start with a two letter country code, followed by a string of 2-15 numbers and/or letters"
          )}
        </p>
        <Input
          value={form?.vat?.VatID || ""}
          onChange={(v) =>
            setForm((e) => ({
              ...e,
              vat: { ...e?.vat, VatID: v.target.value },
            }))
          }
          placeholder={`e.g. GB123456789`}
        />
      </div>
      <Button
        onClick={() => {
          mutate(form);
        }}
        className="self-end mt-8"
      >
        {t("Save")}
      </Button>
    </div>
  );
};
