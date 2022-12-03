import React from "react";
import { InputGroup, Select, SelectOption } from "ui";
import { mapArray } from "utils";

export interface FilterSelectInputProps {
  options: string[];
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

export const FilterSelectInput: React.FC<FilterSelectInputProps> = (props) => {
  return (
    <InputGroup
      style={{
        border: "0.3px solid rgba(0, 0, 0, 0.2)",
      }}
      className="border-[0px] h-12 rounded-md w-full"
    >
      <Select
        placeholder={props.placeholder}
        className="border-[0px] pl-[0px] text-iconGray w-full"
        value={props.value || ""}
        onOptionSelect={props.onChange || (() => {})}
      >
        {mapArray(props.options, (opt, i) => (
          <SelectOption key={i} value={opt}>
            {opt}
          </SelectOption>
        ))}
      </Select>
    </InputGroup>
  );
};
