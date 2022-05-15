import { Flex, Input, InputProps, Text } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import React from "react";
import { TranslationTextType } from "types";
import { TranslationText } from "ui";

export interface FormikInputProps extends InputProps {
  label?: TranslationTextType;
  name: string;
}

export const FormikInput: React.FC<FormikInputProps> = ({
  label,
  name,
  ...props
}) => {
  return (
    <>
      <Flex direction={"column"}>
        {label && <TranslationText translationObject={label} />}
        <Field {...props} as={Input} name={name} />
        <ErrorMessage name={name} />
      </Flex>
    </>
  );
};
