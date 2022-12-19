import React from "react";
import { HtmlInputProps } from "types";
import {
  Input,
  InputGroup,
  InputRightElement,
  TriangleArrowFillDownIcon,
  TriangleArrowFillUpIcon,
} from "@UI";
import { setTestid } from "utils";
export interface NumberInputProps
  extends Omit<HtmlInputProps, "value" | "onChange"> {
  value: number;
  onChange: (value: number) => any;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value,
  ...props
}) => {
  return (
    <InputGroup
      style={{
        border: "0.3px solid rgba(0, 0, 0, 0.2)",
      }}
      className="border-[0px] rounded-md w-full"
    >
      <InputRightElement>
        <div className="flex flex-col gap-1 text-sm items-center text-iconGray pr-4">
          <TriangleArrowFillUpIcon
            className="cursor-pointer"
            {...setTestid("IncrementBtn")}
            onClick={() => onChange && onChange(value + 1)}
          />
          <TriangleArrowFillDownIcon
            {...setTestid("DecrementBtn")}
            className="cursor-pointer"
            onClick={() => onChange && onChange(value - 1)}
          />
        </div>
      </InputRightElement>
      <Input
        {...props}
        {...setTestid("Input")}
        className="rounded-md"
        type={"number"}
        value={value}
      />
    </InputGroup>
  );
};
