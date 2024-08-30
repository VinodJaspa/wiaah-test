import { ErrorMessage, Field } from "formik";
import React from "react";
import { HtmlDivProps, TranslationTextType, HtmlInputProps } from "types";
import { TranslationText, Input, InputProps } from "@UI";
import {
  useFormTranslationWrapper,
  getTranslationStateValue,
  setTranslationStateValue,
} from "@UI";
import { startCase } from "lodash";
import { cn } from "utils";

export interface FormikInputProps extends HtmlInputProps {
  label?: TranslationTextType;
  labelProps?: HtmlDivProps;
  name: string;
  as?: React.FC<any>;
  containerProps?: HtmlDivProps;
  formikSetField?: (key: string, value: any) => any;
  formikValues?: any;
}

export function FormikInput<T = InputProps>({
  name,
  label,
  children,
  as = Input,
  containerProps,
  labelProps,
  ...props
}: FormikInputProps & T) {
  return (
    <>
      <div
        className={
          (cn("gap-2 flex flex-col w-full"), containerProps?.className)
        }
      >
        {label && typeof label === "string" ? (
          <p
            {...labelProps}
            className={`${labelProps?.className || ""} font-semibold`}
          >
            {label}
          </p>
        ) : label ? (
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
          <ErrorMessage name={name} />
        </span>
      </div>
    </>
  );
}

export const FormikTransalationInput: React.FC<
  {
    label?: TranslationTextType | string;
    labelProps?: HtmlDivProps;
    name: string;
    as?: React.FC;
    containerProps?: HtmlDivProps;
    formikSetField: (key: string, value: any) => any;
    formikValues: any;
  } & HtmlInputProps
> = ({
  name,
  children,
  containerProps,
  formikSetField,
  formikValues,
  label = startCase(name),
  labelProps,
  as,
  ...props
}) => {
    const { lang } = useFormTranslationWrapper();
    return (
      <>
        <div
          className={`${containerProps ? containerProps.className : ""
            } gap-2 flex flex-col w-full`}
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
          <Field
            as={as}
            {...props}
            value={getTranslationStateValue(formikValues, name, lang)}
            onChange={(e: any) =>
              formikSetField &&
              formikSetField(
                name,
                setTranslationStateValue(formikValues, name, e.target.value, lang)
              )
            }
          />
          <span className="text-red-500">
            {/* @ts-ignore */}
            {/* <ErrorMessage name={name} /> */}
          </span>
        </div>
      </>
    );
  };
