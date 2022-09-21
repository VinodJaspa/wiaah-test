import React from "react";
import { useTranslation } from "react-i18next";
import { PaintIcon, Select, SelectOption } from "ui";
import { mapArray } from "utils";

export interface ProductColorSelectInputProps {
  colors: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

export const ProductColorSelectInput: React.FC<
  ProductColorSelectInputProps
> = ({ colors, onChange, value, placeholder }) => {
  const { t } = useTranslation();
  const ph = placeholder || `${t("Color")}...`;
  return (
    <div className="flex w-full items-center gap-2">
      <PaintIcon className="text-xl text-primary" />
      <Select
        value={value}
        placeholder={ph}
        className="border-[0px] w-full"
        onOptionSelect={onChange}
      >
        {mapArray(colors, (color, i) => (
          <SelectOption key={i} value={color.value}>
            <p>{color.label}</p>
          </SelectOption>
        ))}
      </Select>
    </div>
  );
};
