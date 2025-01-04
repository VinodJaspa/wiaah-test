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
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { countries, getCitiesOfCountry, mapArray, useForm } from "utils";

const FAKE_COUNTIRES = [
  {
    __typename: "Country",
    code: "US",
    id: "country1",
    name: "United States",
  },
  {
    __typename: "Country",
    code: "CA",
    id: "country2",
    name: "Canada",
  },
  {
    __typename: "Country",
    code: "GB",
    id: "country3",
    name: "United Kingdom",
  },
];
[
  {
    __typename: "City",
    code: "NY",
    id: "city1",
    name: "New York",
    cityId: "1001",
  },
  {
    __typename: "City",
    code: "LA",
    id: "city2",
    name: "Los Angeles",
    cityId: "1002",
  },
  {
    __typename: "City",
    code: "CHI",
    id: "city3",
    name: "Chicago",
    cityId: "1003",
  },
];

const FAKE_CITEIES = [
  {
    __typename: "City",
    code: "NY",
    id: "city1",
    name: "New York",
    cityId: "1001",
  },
  {
    __typename: "City",
    code: "LA",
    id: "city2",
    name: "Los Angeles",
    cityId: "1002",
  },
  {
    __typename: "City",
    code: "CHI",
    id: "city3",
    name: "Chicago",
    cityId: "1003",
  },
];

const EditBannedCountry = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const isNew = id === "new";

  const { mutate: ban } = useAdminBanSellersCitites();
  const { mutate: unban } = useAdminBanBuyersCitites();
  // get Banned Countries
  const { data: _bannedContry } = useAdminGetBannedCountryQuery(id, !isNew);

  const { form: countriesSearch } =
    useForm<Parameters<typeof useGetCountriesQuery>[0]>("");

  const { inputProps: cititesInputProps, form: cititesSearch } = useForm<
    Parameters<typeof useGetCountryCititesQuery>[0]
  >({ countryid: "", name: "" });

  // Get Country based on name
  const { data: _countries } = useGetCountriesQuery(countriesSearch);
  const countries = FAKE_COUNTIRES;
  // Get all cities in a specific country based on countryid an name
  const { data: _cities } = useGetCountryCititesQuery(cititesSearch);
  const cities = FAKE_CITEIES;

  const { form, inputProps } = useForm<Parameters<typeof ban>[0]>({
    citiesIds: cities.map((v) => v.cityId),
  });

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Banned Countries Edit Form </title>
      </Head>
      <section>
        <AdminListTable
          data={[]}
          headers={[]}
          edit
          onBack={() => back()}
          onSave={() => {
            const removed = cities.filter(
              (v) => !form.citiesIds.includes(v.cityId),
            );
            const newCitites = form.citiesIds.filter(
              (v) => !cities.map((v) => v.cityId).includes(v as string),
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
                suggestions={cities.map((v) => ({
                  label: v.name,
                  value: v.id,
                }))}
              />
            </div>
          </div>
        </AdminListTable>
      </section>
    </React.Fragment>
  );
};

export default EditBannedCountry;
