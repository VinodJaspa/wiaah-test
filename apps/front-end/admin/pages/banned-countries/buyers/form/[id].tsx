import { MultiChooseInput } from "@blocks";
import { AdminListTable } from "@components";
import {
  FlagIcon,
  HStack,
  InputRequiredStar,
  Select,
  SelectOption,
} from "@partials";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { cities, countries, getCitiesOfCountry } from "utils";

const editBannedCountry = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  return (
    <section>
      <AdminListTable
        data={[]}
        headers={[]}
        edit
        onBack={() => back()}
        onSave={() => {}}
        title={t("Edit Buyers Banned Country")}
      >
        <Formik
          onSubmit={() => {}}
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
                  <SelectOption value={isoCode}>
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
                    (v) => v.name
                  )}
                />
              </div>
            </div>
          )}
        </Formik>
      </AdminListTable>
    </section>
  );
};

export default editBannedCountry;
