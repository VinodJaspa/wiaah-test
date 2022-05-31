// import {  } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import React from "react";
import { HtmlDivProps, TranslationTextType, HtmlInputProps } from "types";
import { TranslationText, Input, InputProps } from "ui";

export interface FormikInputProps extends HtmlInputProps {
  label?: TranslationTextType | string;
  name: string;
  as?: React.TrackableComponent;
  containerProps?: HtmlDivProps;
}

export function FormikInput<T = InputProps>({
  label,
  name,
  children,
  as = Input,
  containerProps,
  ...props
}: FormikInputProps & T) {
  return (
    <>
      <div
        className={`${
          containerProps ? containerProps.className : ""
        } flex flex-col`}
      >
        {typeof label === "string" ? (
          label
        ) : typeof label === "object" ? (
          <TranslationText className="font-bold" translationObject={label} />
        ) : null}
        <Field {...props} as={as} name={name}>
          {children}
        </Field>
        <span className="text-red-500">
          <ErrorMessage name={name} />
        </span>
      </div>
    </>
  );
}
