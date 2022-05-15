// import { Checkbox } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Input, Checkbox, Select as AntSelect } from "antd";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { FormikInput } from "ui";

const { TextArea } = Input;
const { Option } = AntSelect;

let countriesArray = Array();
const countries = Country.getAllCountries();
countries.forEach((element) => {
  countriesArray.push({
    value: element.isoCode,
    label: element.name,
  });
});

export interface ShopInformationStepProps {}

export const ShopInformationStep: React.FC<ShopInformationStepProps> = ({}) => {
  const { t } = useTranslation();

  let [states, setState] = React.useState([
    { value: "", label: t("Select_country_first!", "Select country first!") },
  ]);
  let [cities, setCities] = React.useState([
    { value: "", label: t("Select_state_first!", "Select state first!") },
  ]);

  let [countryCode, setCountryCode] = React.useState("");
  let [stateCode, setStateCode] = React.useState("");
  function handleCountryChange(value: any) {
    setStateCode("");
    setCountryCode(value.value);
  }
  function handleStateChange(value: any) {
    setStateCode(value.value);
  }

  React.useEffect(() => {
    const statesArray = State.getStatesOfCountry(countryCode);
    let index = 0;
    statesArray?.forEach((element) => {
      states[index] = { value: element.isoCode, label: element.name };
      index++;
    });
  }, [countryCode]);
  React.useEffect(() => {
    const citiesArray = City.getCitiesOfState(countryCode, stateCode);
    let index = 0;
    citiesArray?.forEach((element) => {
      cities[index] = { value: element.name, label: element.name };
      index++;
    });
  }, [stateCode]);

  return (
    <div>
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Fill_out_shop_information", "Fill out shop information")}
      </h2>
      <div className="flex py-4">
        <div className="w-full">
          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
              <Form>
                <FormikInput
                  name="companyName"
                  className="my-2"
                  placeholder={t("Company", "Company")}
                />
                <FormikInput
                  name="Address"
                  className="my-2"
                  placeholder={t("Address", "Address") + " 1"}
                />
                <FormikInput
                  name="Address2"
                  className="my-2"
                  placeholder={t("Address", "Address") + " 2"}
                />
                <Select
                  id="countryselect"
                  instanceId="countryselect"
                  className="react-select-container mb-4 rounded-md border-gray-300"
                  classNamePrefix="react-select"
                  options={countriesArray}
                  placeholder={t("Country", "Country")}
                  onChange={(value) => {
                    handleCountryChange(value);
                  }}
                />
                <Select
                  id="stateselect"
                  instanceId="stateselect"
                  className="react-select-container mb-4 rounded-md border-gray-300"
                  classNamePrefix="react-select"
                  onChange={(value) => {
                    handleStateChange(value);
                  }}
                  options={states}
                  placeholder={t("State", "State")}
                />
                <Select
                  id="cityselect"
                  instanceId="cityselect"
                  className="react-select-container mb-4 rounded-md border-gray-300"
                  classNamePrefix="react-select"
                  options={cities}
                  placeholder={t("City", "City")}
                />
                <Input
                  className="mb-4 rounded-md border-gray-300"
                  size="large"
                  placeholder={t(
                    "company_CRN",
                    "Company Registered Number (CRN)"
                  )}
                />
                <AntSelect
                  placeholder={t("Currency", "Currency")}
                  className="mb-4 w-full border-gray-300"
                  size="large"
                >
                  <Option value="male">USD</Option>
                  <Option value="femal">EUR</Option>
                </AntSelect>
                <AntSelect
                  placeholder={t("Type_of_Seller", "Type of Seller")}
                  className="mb-4 w-full border-gray-300"
                  size="large"
                >
                  <Option value="male">{t("ONE", "ONE")}</Option>
                  <Option value="femal">{t("TOW", "TOW")}</Option>
                </AntSelect>
                <AntSelect
                  placeholder={t("Type_of_Shop", "Type of Shop")}
                  className="mb-4 w-full border-gray-300"
                  size="large"
                >
                  <Option value="male">{t("ONE", "ONE")}</Option>
                  <Option value="femal">{t("TOW", "TOW")}</Option>
                </AntSelect>
                <TextArea
                  rows={4}
                  placeholder={t("Brand_presentation", "Brand presentation")}
                  className="mb-4 w-full border-gray-300"
                  maxLength={6}
                />
                <div className="">
                  <label htmlFor="">{t("Store_for", "Store for")}</label>
                  <div className="mt-2">
                    <Checkbox>{t("All", "All")}</Checkbox>
                    <Checkbox>{t("Men", "Men")}</Checkbox>
                    <Checkbox>{t("Women", "Women")}</Checkbox>
                    <Checkbox>{t("Children", "Children")}</Checkbox>
                    <Checkbox>{t("Babies", "Babies")}</Checkbox>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
