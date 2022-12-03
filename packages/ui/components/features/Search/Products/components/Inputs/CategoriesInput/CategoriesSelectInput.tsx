import React from "react";
import { useTranslation } from "react-i18next";
import { ServicesIcon, Select, SelectOption } from "ui";
import { mapArray } from "utils";

export interface CategoriesSelectInputProps {
  categories: string[];
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

export const CategoriesSelectInput: React.FC<CategoriesSelectInputProps> = ({
  categories,
  onChange,
  value,
  placeholder,
}) => {
  const { t } = useTranslation();
  const ph = placeholder || `${t("Categories")}`;
  return (
    <div className="flex w-full items-center gap-2">
      <ServicesIcon className="text-xl text-primary" />
      <Select
        value={value}
        placeholder={ph}
        className="border-[0px] w-full"
        onOptionSelect={onChange}
      >
        {mapArray(categories, (cate, i) => (
          <SelectOption key={i} value={cate}>
            <p>{cate}</p>
          </SelectOption>
        ))}
      </Select>
    </div>
  );
};
