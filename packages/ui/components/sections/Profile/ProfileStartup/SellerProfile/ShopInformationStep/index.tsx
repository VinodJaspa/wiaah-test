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
  PhoneNumberInput,
  Button,
  PlusIcon,
  MediaUploadModal,
  useGetServiceCategoriesQuery,
} from "@UI";
import { useReactPubsub } from "react-pubsub";
import { useTypedReactPubsub } from "@libs";

let countriesArray = Country.getAllCountries().map((element) => ({
  value: element.isoCode,
  label: element.name,
}));

export interface ShopInformationStepProps {
  onChange?: (props: Record<string, any>) => any;
}

export const ShopInformationStep: React.FC<ShopInformationStepProps> = ({
  onChange,
}) => {
  const { t } = useTranslation();
  const { emit } = useTypedReactPubsub((events) => events.openFileUploadModal);
  let [states, setState] = React.useState([
    { value: "", label: t("Select_country_first!", "Select country first!") },
  ]);
  let [cities, setCities] = React.useState([
    { value: "", label: t("Select_state_first!", "Select state first!") },
  ]);
  const { data: categories } = useGetServiceCategoriesQuery();
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
        {t("Fill out shop information")}
      </h2>
      <div className="flex py-4">
        <div className="w-full text-gray-500">
          <Formik
            initialValues={
              {
                storeFor: [],
                type_of_shop: "",
                type_of_service: "",
              } as Record<string, any>
            }
            onSubmit={() => {}}
          >
            {({ values, setFieldValue }) => {
              onChange && onChange(values);
              return (
                <Form className="flex flex-col gap-4">
                  <FormikInput name="companyName" placeholder={t("Company")} />
                  <FormikInput
                    name="Address"
                    placeholder={t("Address") + " 1"}
                  />
                  <FormikInput
                    name="Address2"
                    placeholder={t("Address") + " 2"}
                  />
                  <PhoneNumberInput
                    value={values["phoneNumber"]}
                    onChange={(v) => setFieldValue("phoneNumber", v)}
                  />
                  <Select
                    placeholder={t("Type of Account")}
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
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-lg">
                      {t("Upload commercial register extract")}
                    </p>
                    <Button
                      outline
                      onClick={() => emit({ uploadType: "img" })}
                      className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                    >
                      <p>{t("Back Side")}</p>
                      <PlusIcon className="text-4xl" />
                    </Button>
                    <MediaUploadModal />
                  </div>

                  <Input
                    className=" rounded-md"
                    placeholder={t(
                      "company_CRN",
                      "Company Registered Number (CRN)"
                    )}
                  />
                  <Select
                    placeholder={t("select_currency", "Select Currency")}
                    className=" w-full "
                  >
                    <SelectOption value="USD">USD</SelectOption>
                    <SelectOption value="EUR">EUR</SelectOption>
                  </Select>
                  <Select
                    placeholder={t("select_language", "Select Language")}
                    className=" w-full "
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
                    placeholder={t("Type of Seller")}
                    className=" w-full "
                  >
                    <SelectOption value="one">{t("Professional")}</SelectOption>
                    <SelectOption value="two">{t("Individual")}</SelectOption>
                  </Select>
                  <Select
                    placeholder={t("Type of Shop")}
                    onOptionSelect={(v) => setFieldValue("type_of_shop", v)}
                    className=" w-full "
                  >
                    <SelectOption value="prodcuts">
                      {t("Products Shop")}
                    </SelectOption>
                    <SelectOption value="services">
                      {t("Services Shop")}
                    </SelectOption>
                  </Select>
                  {values["type_of_shop"] === "services" ? (
                    <Select
                      onOptionSelect={(v) =>
                        setFieldValue("type_of_service", v)
                      }
                      placeholder={t("Choose Service Type")}
                    >
                      {categories?.map(({ slug, name }, i) => (
                        <SelectOption key={i} value={slug}>
                          {name}
                        </SelectOption>
                      ))}
                    </Select>
                  ) : null}
                  <Textarea
                    placeholder={t("Brand presentation")}
                    className=" w-full "
                  />
                  <div className="flex gap-2 items-end">
                    <span className="font-semibold text-lg">
                      {t("Store for")}:
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
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
