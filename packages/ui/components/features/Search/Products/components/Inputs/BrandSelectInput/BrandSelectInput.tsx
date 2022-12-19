import React from "react";
import {
  InputGroup,
  InputLeftElement,
  Select,
  SelectOption,
  SpeedClockIcon,
  Divider,
  NikeIcon,
} from "@UI";
import { mapArray } from "utils";

export interface BrandSelectInputProps {
  options: string[];
  value: string;
  onChange: (value: string) => any;
}

export const BrandSelectInput: React.FC<BrandSelectInputProps> = (props) => {
  return (
    <InputGroup
      style={{
        border: "0.3px solid rgba(0, 0, 0, 0.2)",
      }}
      className="border-[0px] rounded-md w-full"
    >
      <InputLeftElement className="flex pr-[0px] gap-2">
        <NikeIcon className="text-2xl text-iconGray" />
        <Divider variant="vert" className="border-iconGray h-[auto] mx-[0px]" />
      </InputLeftElement>
      <Select
        className="border-[0px] pl-[0px] text-iconGray w-full"
        value={props.value || ""}
        onOptionSelect={props.onChange || (() => {})}
      >
        {mapArray(props.options, (opt, i) => (
          <SelectOption className="pl-[0px]" key={i} value={opt}>
            {opt}
          </SelectOption>
        ))}
      </Select>
    </InputGroup>
  );
};
