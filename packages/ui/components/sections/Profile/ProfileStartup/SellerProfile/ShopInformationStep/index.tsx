import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Country, State, City } from "country-state-city";
import {
  FormikInput,
  TranslationText,
  Textarea,
  Input,
  SelectOption,
  Checkbox,
  Select,
  AvailableInArray,
  isAllAvailableInArray,
  storeForOptions,
  ToggleInArray,
  accountTypes,
} from "ui";

let countriesArray = Country.getAllCountries().map((element) => ({
  value: element.isoCode,
  label: element.name,
}));

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
        <div className="w-full text-gray-500">
          <Formik
            initialValues={{
              storeFor: [],
            }}
            onSubmit={() => {}}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                <FormikInput
                  name="companyName"
                  placeholder={t("Company", "Company")}
                />
                <FormikInput
                  name="Address"
                  placeholder={t("address", "Address" + " 1")}
                />
                <FormikInput
                  name="Address2"
                  placeholder={t("address", "Address") + " 2"}
                />
                <Select
                  placeholder={t("type_of_account", "Type of Account")}
                  className="w-full "
                >
                  <SelectOption value={"0"}>not implemented</SelectOption>
                </Select>
                <Select
                  placeholder={t("type_of_company", "Type of Company")}
                  className="w-full "
                >
                  <SelectOption value={"0"}>not implemented</SelectOption>
                </Select>
                <Select
                  id="countryselect"
                  placeholder={t("Country", "Country")}
                  onChange={(value) => {
                    handleCountryChange(value);
                  }}
                >
                  {countriesArray.map((country, i) => (
                    <SelectOption value={country.value} key={i}>
                      {country.label}
                    </SelectOption>
                  ))}
                </Select>
                <Select
                  id="stateselect"
                  onOptionSelect={(value) => {
                    handleStateChange(value);
                  }}
                  placeholder={t("State", "State")}
                >
                  {states.map((state, i) => (
                    <SelectOption key={i} value={state.value}>
                      {state.label}
                    </SelectOption>
                  ))}
                </Select>
                <Select id="cityselect" placeholder={t("City", "City")}>
                  {cities.map((city, i) => (
                    <SelectOption value={city.value} key={i}>
                      {city.label}
                    </SelectOption>
                  ))}
                </Select>
                <Input
                  className=" rounded-md border-gray-300"
                  placeholder={t(
                    "company_CRN",
                    "Company Registered Number (CRN)"
                  )}
                />
                <Select
                  placeholder={t("select_currency", "Select Currency")}
                  className=" w-full border-gray-300"
                >
                  <SelectOption value="USD">USD</SelectOption>
                  <SelectOption value="EUR">EUR</SelectOption>
                </Select>
                <Select
                  placeholder={t("select_language", "Select Language")}
                  className=" w-full border-gray-300"
                >
                  <SelectOption value="english">
                    <TranslationText
                      translationObject={{
                        translationKey: "english",
                        fallbackText: "English",
                      }}
                    />
                  </SelectOption>
                  <SelectOption value="french">
                    <TranslationText
                      translationObject={{
                        translationKey: "french",
                        fallbackText: "French",
                      }}
                    />
                  </SelectOption>
                  <SelectOption value="germen">
                    <TranslationText
                      translationObject={{
                        translationKey: "germen",
                        fallbackText: "Germen",
                      }}
                    />
                  </SelectOption>
                </Select>
                <Select
                  placeholder={t("Type_of_Seller", "Type of Seller")}
                  className=" w-full border-gray-300"
                >
                  <SelectOption value="one">{t("ONE", "ONE")}</SelectOption>
                  <SelectOption value="two">{t("TOW", "TOW")}</SelectOption>
                </Select>
                <Select
                  placeholder={t("Type_of_Shop", "Type of Shop")}
                  className=" w-full border-gray-300"
                >
                  <SelectOption value="one">{t("ONE", "ONE")}</SelectOption>
                  <SelectOption value="two">{t("TOW", "TOW")}</SelectOption>
                </Select>
                <Textarea
                  placeholder={t("Brand_presentation", "Brand presentation")}
                  className=" w-full border-gray-300"
                />
                <div className="flex gap-2 items-end">
                  <span className="font-semibold text-lg">
                    {t("Store_for", "Store for")}:
                  </span>
                  <div className="mt-2 flex gap-2">
                    <Checkbox
                      checked={isAllAvailableInArray(
                        storeForOptions.map((opt) => opt.value),
                        values.storeFor
                      )}
                      readOnly
                    >
                      {t("All", "All")}
                    </Checkbox>
                    {storeForOptions.map((opt, i) => (
                      <Checkbox
                        checked={AvailableInArray(opt.value, values.storeFor)}
                        onChange={(e) =>
                          setFieldValue(
                            "storeFor",
                            ToggleInArray(
                              values.storeFor,
                              e.target.checked,
                              opt.value
                            )
                          )
                        }
                        key={i}
                      >
                        <TranslationText translationObject={opt.name} />
                      </Checkbox>
                    ))}
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
