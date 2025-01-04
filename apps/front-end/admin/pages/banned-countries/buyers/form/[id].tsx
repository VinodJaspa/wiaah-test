import { MultiChooseInput } from "@blocks";
import { AdminListTable } from "@components";
import {
  FlagIcon,
  HStack,
  InputRequiredStar,
  Select,
  SelectOption,
} from "@partials";
import { ICountry } from "country-state-city";
import { Formik } from "formik";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

const getCitiesOfCountry = (countryCode: string): any[] => {
  const citiesByCountryCode: { [key: string]: any[] } = {
    US: [
      { name: "New York", code: "NY" },
      { name: "Los Angeles", code: "LA" },
      { name: "Chicago", code: "CHI" },
    ],
    CA: [
      { name: "Toronto", code: "TOR" },
      { name: "Vancouver", code: "VAN" },
      { name: "Montreal", code: "MTL" },
    ],
    GB: [
      { name: "London", code: "LDN" },
      { name: "Manchester", code: "MAN" },
      { name: "Birmingham", code: "BHM" },
    ],
  };

  return citiesByCountryCode[countryCode] || [];
};
const countries: ICountry[] = [
  {
    name: "United States",
    phonecode: "+1",
    isoCode: "US",
    flag: "🇺🇸",
    currency: "USD",
    latitude: "37.0902",
    longitude: "-95.7129",
  },
  {
    name: "Canada",
    phonecode: "+1",
    isoCode: "CA",
    flag: "🇨🇦",
    currency: "CAD",
    latitude: "56.1304",
    longitude: "-106.3468",
  },
  {
    name: "United Kingdom",
    phonecode: "+44",
    isoCode: "GB",
    flag: "🇬🇧",
    currency: "GBP",
    latitude: "55.3781",
    longitude: "-3.4360",
  },
];

const EditBannedCountry = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

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
          onSave={() => { }}
          title={t("Edit Buyers Banned Country")}
        >
          <Formik
            onSubmit={() => { }}
            initialValues={{ countryCode: "", cities: [] }}
          >
            {({ values, setFieldValue }) => (
              <div className="w-full grid gap-4 grid-cols-4">
                <HStack>
                  <InputRequiredStar />
                  <p>{t("Country")}</p>
                </HStack>
                <Select
                  placeholder={t("Select Country")}
                  value={values.countryCode}
                  onOptionSelect={(v) => setFieldValue("countryCode", v)}
                  className="col-span-3"
                >
                  {countries.map(({ isoCode, name }) => (
                    <SelectOption key={isoCode} value={isoCode}>
                      <HStack>
                        <FlagIcon code={isoCode} />
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
                    value={values.cities}
                    onChange={(v) => setFieldValue("cities", v)}
                    suggestions={getCitiesOfCountry(values.countryCode).map(
                      (v) => v.name,
                    )}
                  />
                </div>
              </div>
            )}
          </Formik>
        </AdminListTable>
      </section>
    </React.Fragment>
  );
};

export default EditBannedCountry;
