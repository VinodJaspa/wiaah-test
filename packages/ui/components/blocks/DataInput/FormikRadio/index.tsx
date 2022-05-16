import React from "react";
import {
  Radio,
  RadioGroup,
  RadioProps,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { FormikInput, FormikInputProps } from "ui";
import { FormOptionType } from "types";
import { TranslationText } from "../../../partials";

export interface FormikRadioProps extends FormikInputProps {
  options: FormOptionType[];
  radioProps?: RadioProps;
  stackProps?: StackProps;
  align?: "end" | "start";
}

export const FormikRadio: React.FC<FormikRadioProps> = ({
  options,
  radioProps,
  stackProps,
  ...props
}) => {
  return (
    <FormikInput {...props} as={RadioGroup}>
      <Stack {...stackProps}>
        {options.map((opt, i) => (
          <Radio value={opt.value} key={i} {...radioProps}>
            <TranslationText translationObject={opt.name} />
          </Radio>
        ))}
      </Stack>
    </FormikInput>
  );
};
