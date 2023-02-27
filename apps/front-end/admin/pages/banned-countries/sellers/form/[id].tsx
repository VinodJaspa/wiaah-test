import { MultiChooseInput } from "@blocks";
import { AdminListTable } from "@components";
import {
  FlagIcon,
  HStack,
  InputRequiredStar,
  Select,
  SelectOption,
} from "@partials";
import {
  useAdminBanBuyersCitites,
  useAdminBanSellersCitites,
  useAdminGetBannedCountryQuery,
  useAdminUnBanSellersCitites,
  useGetCountriesQuery,
  useGetCountryCititesQuery,
} from "@UI";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { countries, getCitiesOfCountry, mapArray, useForm } from "utils";

const editBannedCountry = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const isNew = id === "new";

  const { mutate: ban } = useAdminBanSellersCitites();
  const { mutate: unban } = useAdminBanBuyersCitites();
  const { data } = useAdminGetBannedCountryQuery(id, !isNew);

  const { form: countriesSearch } =
    useForm<Parameters<typeof useGetCountriesQuery>[0]>("");
  const { inputProps: cititesInputProps, form: cititesSearch } = useForm<
    Parameters<typeof useGetCountryCititesQuery>[0]
  >({ countryid: "", name: "" });

  const { data: countries } = useGetCountriesQuery(countriesSearch);
  const { data: citites } = useGetCountryCititesQuery(
    cititesSearch,
    cititesSearch.countryid && cititesSearch?.countryid?.length > 0
  );

  const { form, inputProps } = useForm<Parameters<typeof ban>[0]>(
    {
      citiesIds: data.cities.map((v) => v.cityId),
    },
    {
      citiesIds: data.cities.map((v) => v.cityId),
    }
  );

  return (
    <section>
      <AdminListTable
        data={[]}
        headers={[]}
        edit
        onBack={() => back()}
        onSave={() => {
          const removed = data.cities.filter(
            (v) => !form.citiesIds.includes(v.cityId)
          );
          const newCitites = form.citiesIds.filter(
            (v) => !data.cities.map((v) => v.cityId).includes(v)
          );

          if (removed && removed.length > 0) {
            unban({
              citiesIds: removed.map((v) => v.cityId),
            });
          }
          if (newCitites && newCitites.length > 0) {
            ban({
              citiesIds: newCitites,
            });
          }
        }}
        title={t("Edit Seller Banned Country")}
      >
        <div className="w-full grid gap-4 grid-cols-4">
          <HStack>
            <InputRequiredStar />
            <p>{t("Country")}</p>
          </HStack>
          <Select placeholder={t("Select Country")} className="col-span-3">
            {mapArray(countries, ({ name, code, id }) => (
              <SelectOption value={id}>
                <HStack>
                  <FlagIcon code={code} />
                  <p>{name}</p>
                </HStack>
              </SelectOption>
            ))}
          </Select>
          <HStack>
            <InputRequiredStar />
            <p>{t("City")}</p>
          </HStack>
          <div className="col-span-3">
            <MultiChooseInput
              placeholder={t("Select country to see its cities here")}
              {...inputProps("citiesIds")}
              suggestions={citites.map((v) => ({
                label: v.name,
                value: v.id,
              }))}
            />
          </div>
        </div>
      </AdminListTable>
    </section>
  );
};

export default editBannedCountry;
