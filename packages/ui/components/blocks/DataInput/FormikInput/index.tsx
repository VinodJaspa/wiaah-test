import { Flex, FlexProps, Input, InputProps, Text } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import React from "react";
import { TranslationTextType } from "types";
import { TranslationText } from "ui";

export interface FormikInputProps extends InputProps {
  label?: TranslationTextType;
  name: string;
  containerProps?: FlexProps;
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
      <Flex
        {...containerProps}
        direction={containerProps?.direction || "column"}
      >
        {label && (
          <TranslationText
            whiteSpace={"nowrap"}
            fontWeight={"Bold"}
            translationObject={label}
          />
        )}
        <Field {...props} as={as} name={name}>
          {children}
        </Field>
        <ErrorMessage name={name} />
      </Flex>
    </>
  );
};
