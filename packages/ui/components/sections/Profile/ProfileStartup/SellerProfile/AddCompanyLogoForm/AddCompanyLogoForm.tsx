import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "ui";

export interface AddCompanyLogoFormProps {
  onChange: (props: Record<string, any>) => any;
}

export const AddCompanyLogoForm: React.FC<AddCompanyLogoFormProps> = ({
  onChange,
}) => {
  return (
    <Formik
      onSubmit={() => {}}
      initialValues={{
        logo: null,
      }}
    >
      {({ setFieldValue, values }) => {
        const { t } = useTranslation();

        onChange && onChange(values);
        return (
          <Form className="w-full h-full gap-8 flex flex-col justify-center items-center">
            <p className="font-bold text-xl">
              {t("Upload a logo for your company / brand")}
            </p>
            <label>
              <div className="cursor-pointer h-48 w-48 border-2 flex justify-center items-center border-primary rounded-lg text-primary text-7xl">
                {!!values.logo ? (
                  <img
                    src={values.logo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <input
                      className="hidden"
                      type="file"
                      onChange={(e) => {
                        console.log("test", e.target.files);
                        setFieldValue(
                          "logo",
                          e.target.files ? e.target.files[0] : null
                        );
                      }}
                      accept="image/png, image/jpeg"
                    />
                    <PlusIcon />
                  </>
                )}
              </div>
            </label>
          </Form>
        );
      }}
    </Formik>
  );
};
