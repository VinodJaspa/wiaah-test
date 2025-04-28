import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleVisable, ToggleVisableItem, FormikInput } from "@UI";
import { Formik, Form } from "formik";
import { HStack, Radio, Select, SelectOption } from "@UI";
import {
  Checkbox,
  CheckBoxGroup,
  CheckboxGroupProps,
  InputGroup,
  InputLeftElement,
  Input,
} from "@UI";

export interface ExtraServiceOptionsProps {
  onChange: (data: any) => any;
}

export const ExtraServiceOptions: React.FC<ExtraServiceOptionsProps> = ({
  onChange,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <p className="">{t("Extra Bed Options")}</p>
      <p className="bg-primary-50 px-4">
        {t("These are the options for beds that can be added upon request")}
      </p>
      <ToggleVisable>
        {({ changeState }) => (
          <Formik
            initialValues={{
              extraBeds: false,
              extraBedsAccommodate: [],
              numOfBedsCanBeAdded: 1,
              pricePerNight: 10,
            }}
            onSubmit={() => {}}
          >
            {({ values, setFieldValue }) => {
              if (values?.extraBeds) {
                changeState("yes");
              } else {
                changeState("no");
              }
              onChange(values);
              return (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p>{t("Can you provide extra beds ?")}</p>
                    <HStack>
                      <FormikInput
                        as={Radio}
                        id="extrabeds-yes"
                        name="extraBeds"
                      >
                        {t("Yes")}
                      </FormikInput>
                      <FormikInput
                        as={Radio}
                        id="extrabeds-no"
                        name="extraBeds"
                      >
                        {t("No")}
                      </FormikInput>
                    </HStack>
                  </div>
                  <ToggleVisableItem visableOnState={"yes"}>
                    <div className="flex flex-col gap-4">
                      <FormikInput
                        label={t(
                          "Select the number of extra beds that can be added"
                        )}
                        as={Select}
                        name="numOfBedsCanBeAdded"
                      >
                        {[...Array(30)].map((_, i) => (
                          <SelectOption value={i + 1}>{i + 1}</SelectOption>
                        ))}
                      </FormikInput>
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-bold">
                          {t(
                            "Check the box(es) if you can accommodate the following guests in extra beds."
                          )}
                        </span>
                        <FormikInput<CheckboxGroupProps>
                          onChange={(values) =>
                            setFieldValue("extraBedsAccommodate", values)
                          }
                          labelProps={{ className: "text-2xl font-bold" }}
                          as={CheckBoxGroup}
                          name="extraBedsAccommodate"
                        >
                          <Checkbox value={"children-2years"}>
                            {t("Children up to 2 years old in cribs")}
                          </Checkbox>
                          <Checkbox value={"children"}>
                            {t("Children")}
                          </Checkbox>
                          <Checkbox value={"adults"}>{t("Adults")}</Checkbox>
                        </FormikInput>
                      </div>
                      <HStack>
                        <p>
                          {t("Enter the price per night, per adult") +
                            values.extraBedsAccommodate.map((item) => item)}
                        </p>
                        <InputGroup>
                          <InputLeftElement>
                            <p className="bg-gray-100 px-2 py-1 font-bold">
                              USD
                            </p>
                          </InputLeftElement>
                          <FormikInput as={Input} name="pricePerNight" />
                        </InputGroup>
                      </HStack>
                    </div>
                  </ToggleVisableItem>
                </Form>
              );
            }}
          </Formik>
        )}
      </ToggleVisable>
    </div>
  );
};
