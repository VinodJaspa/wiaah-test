import React from "react";
import { HtmlInputProps } from "types";
import { runIfFn } from "utils";
import { Prefix } from "../Prefix";
import { Input } from "./input";

export type InputSearchOptionType = {
  text?: string;
  prefix?: React.ReactNode;
};

export interface InputSearchProps extends HtmlInputProps {
  options: string[] | InputSearchOptionType[];
  onOptionSelect: (option: string[] | InputSearchOptionType) => any;
}

export const InputSearch: React.FC<InputSearchProps> = ({
  onOptionSelect,
  options,
  ...props
}) => {
  const validOptions = Array.isArray(options);
  return (
    <div className="relative">
      <Input {...props} />
      <div className="absolute top-full w-full left-0 max-h-[30rem] overflow-scroll">
        {validOptions
          ? options.map((opt, i) => (
              <div className="p-2">
                {typeof opt === "string" ? (
                  opt
                ) : (
                  <Prefix Prefix={opt.prefix}>{opt.text}</Prefix>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
