import { useForm } from "@UI/../utils/src";
import {
  useGetMyAccountQuery,
  useUpdateAccountMutation,
} from "@features/Accounts";
import { SectionHeader } from "@sections/ShoppingManagement";
import { useTranslation } from "react-i18next";
import React from "react";
import { Select } from "@partials";

export const SiteLanguage: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
  const { data } = useGetMyAccountQuery();

  const { selectProps, form } = useForm<Parameters<typeof mutate>[0]>({
    id: data?.id || accountId,
    lang: data?.lang,
    country: "",
    currency: data?.currency,
  });
  const { mutate } = useUpdateAccountMutation();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Update Language")}>
        <button onClick={() => mutate(form)}>
          <p>{t("Save")}</p>
        </button>
      </SectionHeader>
      <div className="flex flex-col w-full gap-8">
        <Select {...selectProps("lang")} label={t("Language")}></Select>

        <Select {...selectProps("country")} label={t("Country")}></Select>

        <Select {...selectProps("currency")} label={t("Currency")}></Select>
      </div>
    </div>
  );
};

export const MySiteLanguage: React.FC = () => {
  const { data } = useGetMyAccountQuery();

  return data ? <SiteLanguage accountId={data.id} /> : null;
};
