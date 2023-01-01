import React from "react";
import {
  FormikInput,
  HStack,
  HStackProps,
  FormikInputProps,
  TranslationText,
  Radio,
  RadioProps,
} from "@UI";
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
  console.log(options);
  return (
    <FormikInput {...props} as={({ children }: any) => <>{children}</>}>
      <HStack {...stackProps}>
        {options.map((opt, i) => (
          <Radio value={opt.value} key={i} name={props.name} {...radioProps}>
            <TranslationText translationObject={opt.name} />
          </Radio>
        ))}
      </HStack>
    </FormikInput>
  );
};
