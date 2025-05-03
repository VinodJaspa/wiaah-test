import React from "react";
import { useTranslation } from "react-i18next";
import { City, Country, State } from "country-state-city";
import { FormikInput } from "@UI";
import { Field, Formik, Form } from "formik";
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  Select,
  TranslationText,
  DateInput,
  SelectOption,
  accountTypes,
} from "@UI";

export interface PersonalInformationStepProps {
  isValid?: (data: null | Record<string, any>) => any;
}

const countriesArray: {
  value: string;
  label: string;
}[] = [];
const countries = Country.getAllCountries();
countries.forEach((element) => {
  countriesArray.push({
    value: element.isoCode,
    label: element.name,
  });
});

export const PersonalInformationStep: React.FC<
  PersonalInformationStepProps
> = ({ isValid }) => {
const { t } = useTranslation();

  const [countryCode, setCountryCode] = React.useState("");
  const [stateCode, setStateCode] = React.useState("");
  const [states, setState] = React.useState([
    { value: "", label: t("Select_country_first!", "Select country first!") },
  ]);
  const [cities, setCities] = React.useState([
    { value: "", label: t("Select_state_first!", "Select state first!") },
  ]);

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

  function handleCountryChange(value: any) {
    setStateCode("");
    setCountryCode(value.value);
  }
  function handleStateChange(value: any) {
    setStateCode(value.value);
  }

  return (
    <div className="">
      <h2 className="hidden text-xl font-bold md:block">
        {t("Personal_information", "Personal information")}
      </h2>
      <div className="w-full flex gap-4 md:py-5">
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ isValid: formValid, values, setFieldValue }) => {
            if (formValid) {
              isValid && isValid(values);
            } else {
              isValid && isValid(null);
            }
            return (
              <Form className="w-full">
                <div className="w-full flex-col text-gray-500 flex gap-4 ">
                  <FormikInput
                    name="firstName"
                    className="w-full"
                    placeholder={t("First_Name", "First Name") + "*"}
                  />
                  <FormikInput
                    name="lastName"
                    placeholder={t("Last_Name", "Last Name") + "*"}
                  />
                  <FormikInput
                    name="email"
                    placeholder={t("Email", "Email") + "*"}
                  />
                  <Menu className="w-[100%]">
                    <MenuButton>
                      <Input
                        placeholder="BirthDay Date"
                        value={""}
                        className="w-full"
                      />
                    </MenuButton>
                    <MenuList className="left-0 origin-top-left">
                      <DateInput />
                    </MenuList>
                  </Menu>
                  <Field
                    as={Select}
                    name="gender"
                    defaultValue="male"
                    className=" w-full "
                    size="large"
                  >
                    <SelectOption value="male">
                      {t("Male", "Male")}
                    </SelectOption>
                    <SelectOption value="female">
                      {t("Femal", "Female")}
                    </SelectOption>
                  </Field>
                  <Select
                    id="countryselect"
                    className="react-select-container  rounded-md border-gray-300"
                    placeholder={t("Country", "Country")}
                    onOptionSelect={(value) => {
                      setFieldValue("country", value);
                      handleCountryChange(value);
                    }}
                  >
                    {countriesArray.map(({ label, value }, i) => (
                      <SelectOption key={value + i} value={value}>
                        {label}
                      </SelectOption>
                    ))}
                  </Select>
                  <Select
                    id="stateselect"
                    className="react-select-container rounded-md border-gray-300"
                    onOptionSelect={(value) => {
                      if (value) {
                        setFieldValue("state", value);
                      }
                      handleStateChange(value);
                    }}
                    placeholder={t("State", "State")}
                  >
                    {states.map(({ value, label }, i) => (
                      <SelectOption key={value + i} value={value}>
                        {label}
                      </SelectOption>
                    ))}
                  </Select>
                  <Select
                    id="cityselect"
                    className="react-select-container rounded-md border-gray-300"
                    onOptionSelect={(value) => {
                      if (value) {
                        setFieldValue("city", value);
                      }
                    }}
                    placeholder={t("City", "City")}
                  >
                    {cities.map(({ value, label }, i) => (
                      <SelectOption key={value + i} value={value}>
                        {label}
                      </SelectOption>
                    ))}
                  </Select>
                  <Select
                    placeholder={t("select_currency", "Select Currency")}
                    className="mb-4 w-full border-gray-300"
                  >
                    <SelectOption value="male">USD</SelectOption>
                    <SelectOption value="femal">EUR</SelectOption>
                  </Select>
                  <Select
                    placeholder={t("select_language", "Select Language")}
                    className="mb-4 w-full border-gray-300"
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
                  <FormikInput
                    as={Input}
                    name="height"
                    placeholder={t("Height", "Height") + "*"}
                  />
                  <FormikInput
                    as={Input}
                    name="weight"
                    placeholder={t("Weight", "Weight") + "*"}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
