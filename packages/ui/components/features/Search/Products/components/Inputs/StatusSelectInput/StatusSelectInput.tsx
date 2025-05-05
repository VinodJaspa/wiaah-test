import React from "react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputLeftElement,
  Select,
  SelectOption,
  SpeedClockIcon,
  Divider,
} from "@UI";
import { mapArray } from "utils";

export interface StatusSelectInputProps {
  options: string[];
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

export const StatusSelectInput: React.FC<StatusSelectInputProps> = ({
  onChange,
  options,
  value,
  placeholder,
}) => {
const { t } = useTranslation();
  const ph = placeholder || (t("Select Status") as string) || "Select Status";
  return (
    <InputGroup
      style={{
        border: "0.3px solid rgba(0, 0, 0, 0.2)",
      }}
      className="border-[0px] rounded-md w-full"
    >
      <InputLeftElement className="flex pr-[0px] gap-2">
        <SpeedClockIcon className="text-xl text-iconGray" />
        <Divider variant="vert" className="border-iconGray h-[auto] mx-[0px]" />
      </InputLeftElement>
      <Select
        placeholder={ph}
        className="border-[0px] pl-[0px] text-iconGray w-full"
        value={value || ""}
        onOptionSelect={onChange || (() => {})}
      >
        {mapArray(options, (opt, i) => (
          <SelectOption className="pl-[0px]" key={i} value={opt}>
            {opt}
          </SelectOption>
        ))}
      </Select>
    </InputGroup>
  );
};
