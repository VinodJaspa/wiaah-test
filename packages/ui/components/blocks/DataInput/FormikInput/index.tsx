// import {  } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import React from "react";
import { HtmlDivProps, TranslationTextType, HtmlInputProps } from "types";
import { TranslationText, Input } from "ui";

export interface FormikInputProps extends HtmlInputProps {
  label?: TranslationTextType;
  name: string;
  as?: React.ReactNode;
  containerProps?: HtmlDivProps;
}

export const FormikInput: React.FC<FormikInputProps> = ({
  label,
  name,
  children,
  as = Input,
  containerProps,
  ...props
}) => {
  return (
    <>
      <div
        className={`${
          containerProps ? containerProps.className : ""
        } flex flex-col`}
      >
        {label && (
          <TranslationText className="font-bold" translationObject={label} />
        )}
        <Field {...props} as={as} name={name}>
          {children}
        </Field>
        <ErrorMessage name={name} />
      </div>
    </>
  );
};
