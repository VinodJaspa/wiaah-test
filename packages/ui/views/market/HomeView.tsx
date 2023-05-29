import React from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Button,
  Collaboration,
  Divider,
  Pagination,
  Select,
  SelectOption,
  ShopsAndServicesRecommendationsList,
  useGetFilteredShopsQuery,
  usePaginationControls,
} from "@UI";
import { useTranslation } from "react-i18next";
import { countries, getCitiesOfCountry, mapArray } from "utils";
import { Form, Formik } from "formik";

export const HomeView: React.FC = () => {
  const { t } = useTranslation();
  const {
    controls,
    pagination: { page, take },
  } = usePaginationControls({ itemsPerPage: 24 });

  const [filters, setFilters] = React.useState();
  const { data: res } = useGetFilteredShopsQuery({
    pagination: { page, take },
    ...(filters || {}),
  });

  return (
    <>
      <div className="block w-full space-y-6 p-4 flex flex-col gap-4">
        <Formik initialValues={{} as Record<string, any>} onSubmit={() => {}}>
          {({ setFieldValue, values, setValues }) => {
            if (JSON.stringify(values) !== JSON.stringify(filters)) {
              setFilters(values);
            }
            return (
              <Form className="flex flex-col gap-4">
                <div className="grid w-full grid-cols-1 gap-4 rounded-lg bg-primary p-4 md:grid-cols-3 lg:grid-cols-6">
                  <label htmlFor="Category" className="relative flex">
                    <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-primary" />
                    <Select
                      className="w-full"
                      value={values["storeType"]}
                      onOptionSelect={(v) => setFieldValue("storeType", v)}
                      placeholder={t("Type of Store")}
                    >
                      <SelectOption value={"Product"}>
                        {t("Product")}
                      </SelectOption>
                      <SelectOption value={"Service"}>
                        {t("Service")}
                      </SelectOption>
                    </Select>
                  </label>
                  <label htmlFor="Category" className="relative flex">
                    <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
                    <Select
                      className="w-full"
                      value={values["vendorType"]}
                      onOptionSelect={(v) => setFieldValue("vendorType", v)}
                      placeholder={t("Type of Vendor")}
                    >
                      <SelectOption value={"profissional"}>
                        {t("Profissional")}
                      </SelectOption>
                      <SelectOption value={"individual"}>
                        {t("Individual")}
                      </SelectOption>
                    </Select>
                  </label>
                  <label htmlFor="Category" className="relative flex">
                    <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
                    <Select
                      className="w-full"
                      value={values["targetGender"]}
                      onOptionSelect={(v) => setFieldValue("targetGender", v)}
                      placeholder={t("Gender Type")}
                    >
                      <SelectOption value={"male"}>{t("Male")}</SelectOption>
                      <SelectOption value={"female"}>
                        {t("Female")}
                      </SelectOption>
                    </Select>
                  </label>
                  <label htmlFor="Category" className="relative flex">
                    <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
                    <Select
                      className="w-full"
                      value={values["country"]}
                      onOptionSelect={(v) => setFieldValue("country", v)}
                      placeholder={t("Store Location")}
                    >
                      {mapArray(countries, ({ isoCode, name }) => (
                        <SelectOption value={isoCode}>{name}</SelectOption>
                      ))}
                    </Select>
                  </label>
                  <label htmlFor="Category" className="relative flex">
                    <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
                    <Select
                      className="w-full"
                      value={values["city"]}
                      onOptionSelect={(v) => setFieldValue("city", v)}
                      placeholder={t("Filter by City")}
                    >
                      {getCitiesOfCountry(values["country"] as string)?.map(
                        ({ countryCode, name, stateCode }) => (
                          <SelectOption value={countryCode}>
                            {name}
                          </SelectOption>
                        )
                      )}
                    </Select>
                  </label>
                  <Button onClick={() => setValues({})} colorScheme="white">
                    {t("Clear Filters")}
                  </Button>
                </div>

                <ShopsAndServicesRecommendationsList shops={res || []} />
                <Pagination controls={controls} />
              </Form>
            );
          }}
        </Formik>

        <Divider />

        <Collaboration />
      </div>
    </>
  );
};
