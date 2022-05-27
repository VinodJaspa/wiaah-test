import React from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarEdit } from "react-icons/bi";
import { Menu, MenuButton, MenuList, DateInput, Select } from "ui";
import { SelectOption } from "ui";

export interface NewProductDiscountOptionsProps {}

const MAX_DISCOUNT = 100;
const DISCOUNT_INCREMENTAL = 5;

export const NewProductDiscountOptions: React.FC<NewProductDiscountOptionsProps> =
  ({}) => {
    const { t } = useTranslation();
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">
          {t("create_discount_code", "Create Discount Code")}
        </h1>
        <Select placeholder={t("percent_off", "Percent OFF")}>
          {[...Array(MAX_DISCOUNT / DISCOUNT_INCREMENTAL)].map((_, i) => (
            <SelectOption value={i * DISCOUNT_INCREMENTAL}>
              {i * DISCOUNT_INCREMENTAL}%
            </SelectOption>
          ))}
        </Select>
        <div className="flex gap-4 px-1 py-1 w-full border-[1px] items-center border-gray-300">
          <Menu>
            <MenuButton>
              <BiCalendarEdit className="cursor-pointer text-2xl" />
            </MenuButton>
            <MenuList className="left-0 origin-top-left">
              <DateInput />
            </MenuList>
          </Menu>

          <p>{t("start_date", "Start Date")}</p>
        </div>
        <div className="flex gap-4 px-1 py-1 w-full border-[1px] items-center border-gray-300">
          <Menu>
            <MenuButton>
              <BiCalendarEdit className="cursor-pointer text-2xl" />
            </MenuButton>
            <MenuList className="left-0 origin-top-left">
              <DateInput />
            </MenuList>
          </Menu>

          <p>{t("end_date", "End Date")}</p>
        </div>
      </div>
    );
  };
