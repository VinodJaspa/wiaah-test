import { SectionHeader } from "@sections/ShoppingManagement";
import { useTranslation } from "react-i18next";
import {
  AddressInputs,
  ArrowLeftIcon,
  Button,
  Divider,
  HStack,
  Input,
  Radio,
  Select,
  SelectOption,
  UpdateMyShopMutationVariables,
  useResponsive,
  useUpdateMyShopMutation,
} from "@UI";
import React from "react";
import { useForm } from "@UI/../utils/src";
import { useRouting } from "@UI/../routing";
import { ServiceTypeOfSeller } from "@features/API";

export const VatSection: React.FC<{ accountId: string }> = ({ accountId }) => {
const { t } = useTranslation();
  const { form, inputProps } = useForm<UpdateMyShopMutationVariables["args"]>(
    { userId: accountId },
    { userId: accountId }
  );

  const { isMobile } = useResponsive();
  const { back } = useRouting();
  const { mutate } = useUpdateMyShopMutation();

  return isMobile ? (
    <div className="flex flex-col gap-4 p-2">
      <HStack className="relative justify-center">
        <button
          className="absolute min-w-fit min-h-fit top-1/2 -translate-y-1/2 left-0"
          onClick={() => back()}
        >
          <ArrowLeftIcon className="text-2xl" />
        </button>

        <p className="text-lg font-semibold">{t("Vat Setting")}</p>

        <p className="absolute top-1/2 -translate-y-1/2 right-0">
          {t("Finish")}
        </p>
      </HStack>
      <div className="flex flex-col gap-3">
        <p className="text-lg font-medium">{t("Type of seller")}</p>
        <Select>
          {Object.values(ServiceTypeOfSeller).map((v, i) => (
            <SelectOption value={v} key={i}>
              {v}
            </SelectOption>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-lg font-medium">{t("Type of seller")}</p>
        <Select>
          {Object.values(ServiceTypeOfSeller).map((v, i) => (
            <SelectOption value={v} key={i}>
              {v}
            </SelectOption>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-lg font-medium">{t("Type of seller")}</p>
        <Select>
          {Object.values(ServiceTypeOfSeller).map((v, i) => (
            <SelectOption value={v} key={i}>
              {v}
            </SelectOption>
          ))}
        </Select>
      </div>
    </div>
  ) : (
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
        onChange={(d) => {}}
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
          onChange={(v) => {}}
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
