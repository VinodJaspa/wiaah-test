import { ErrorMessage, Field } from "formik";
import React from "react";
import { HtmlDivProps, TranslationTextType, HtmlInputProps } from "types";
import { TranslationText, Input, InputProps } from "ui";

export interface FormikInputProps extends HtmlInputProps {
  label?: TranslationTextType | string;
  labelProps?: HtmlDivProps;
  name: string;
  as?: React.ReactNode;
  containerProps?: HtmlDivProps;
}

export function FormikInput<T = InputProps>({
  label,
  name,
  children,
  as = Input,
  containerProps,
  labelProps,
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
          <p
            {...labelProps}
            className={`${labelProps?.className || ""} font-semibold`}
          >
            {label}
          </p>
        ) : typeof label === "object" ? (
          <TranslationText
            {...labelProps}
            className={labelProps?.className || "font-semibold"}
            translationObject={label}
          />
        ) : null}
        <Field {...props} as={as} name={name}>
          {children}
        </Field>
        <span className="text-red-500">
          {/* @ts-ignore */}
          <ErrorMessage name={name} />
        </span>
      </div>
    </>
  );
}
