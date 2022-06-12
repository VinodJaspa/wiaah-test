import React from "react";
import {
  FormikInput,
  HStack,
  HStackProps,
  FormikInputProps,
  TranslationText,
  Radio,
  RadioProps,
} from "ui";
import { FormOptionType } from "types";

export interface FormikRadioProps extends FormikInputProps {
  options: FormOptionType[];
  radioProps?: RadioProps;
  stackProps?: HStackProps;
  align?: "end" | "start";
}

export const FormikRadio: React.FC<FormikRadioProps> = ({
  options,
  radioProps,
  stackProps,
  ...props
}) => {
  return (
    <FormikInput {...props} as={Radio}>
      <HStack {...stackProps}>
        {options.map((opt, i) => (
          <Radio value={opt.value} key={i} {...radioProps}>
            <TranslationText translationObject={opt.name} />
          </Radio>
        ))}
      </HStack>
    </FormikInput>
  );
};
