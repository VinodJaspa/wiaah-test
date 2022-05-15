import React from "react";
import { useTranslation } from "react-i18next";
import { Input, DatePicker, Select as AntSelect } from "antd";
import Select from "react-select";
import { City, Country, State } from "country-state-city";
import { FormikInput } from "ui";
import { Field, Formik, Form, useFormik } from "formik";

export interface PersonalInformationStepProps {
  isValid?: (data: null | Record<string, any>) => any;
}

const { Option } = AntSelect;
let countriesArray = Array();
const countries = Country.getAllCountries();
countries.forEach((element) => {
  countriesArray.push({
    value: element.isoCode,
    label: element.name,
  });
});

export const PersonalInformationStep: React.FC<PersonalInformationStepProps> =
  ({ isValid }) => {
    const { t } = useTranslation();

    let [countryCode, setCountryCode] = React.useState("");
    let [stateCode, setStateCode] = React.useState("");
    let [states, setState] = React.useState([
      { value: "", label: t("Select_country_first!", "Select country first!") },
    ]);
    let [cities, setCities] = React.useState([
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
                  <div className="w-full flex-col flex gap-4 ">
                    <FormikInput
                      name="firstName"
                      w="full"
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
                    <DatePicker
                      size="large"
                      className="w-full"
                      onChange={(e) => {
                        if (e && setFieldValue) {
                          try {
                            setFieldValue("dateOfBirth", e.toISOString());
                          } catch (error) {}
                        }
                      }}
                      placeholder={t("Date_of_Birthday", "Date of Birthday")}
                    />
                    <Field
                      as={AntSelect}
                      name="gender"
                      defaultValue="male"
                      className=" w-full "
                      size="large"
                    >
                      <Option value="male">{t("Male", "Male")}</Option>
                      <Option value="female">{t("Femal", "Female")}</Option>
                    </Field>
                    <Select
                      id="countryselect"
                      instanceId="countryselect"
                      className="react-select-container  rounded-md border-gray-300"
                      classNamePrefix="react-select"
                      options={countriesArray}
                      placeholder={t("Country", "Country")}
                      onChange={(value) => {
                        setFieldValue("country", value.label);
                        handleCountryChange(value);
                      }}
                    />
                    <Select
                      id="stateselect"
                      instanceId="stateselect"
                      className="react-select-container rounded-md border-gray-300"
                      classNamePrefix="react-select"
                      onChange={(value) => {
                        if (value) {
                          setFieldValue("state", value.label);
                        }
                        handleStateChange(value);
                      }}
                      options={states}
                      placeholder={t("State", "State")}
                    />
                    <Select
                      id="cityselect"
                      instanceId="cityselect"
                      className="react-select-container rounded-md border-gray-300"
                      classNamePrefix="react-select"
                      options={cities}
                      onChange={(e) => {
                        if (e) {
                          setFieldValue("city", e.label);
                        }
                      }}
                      placeholder={t("City", "City")}
                    />
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
