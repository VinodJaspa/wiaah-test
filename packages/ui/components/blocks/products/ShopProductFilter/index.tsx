import React, { useState } from "react";
import { t } from "i18next";
import { Rate } from "antd";
import { Select } from "antd";
import { Button, DropdownPanel, FilterInput, FlexStack, Spacer } from "ui";
import { Country, City } from "country-state-city";

export interface ShopProductFilterProps {
  priceRange?: { min: number; max: number };
  shipping?: string[];
  colors?: string[];
  size?: string[];
  rating?: boolean;
  locations?: string[];
  stockStatus?: boolean;
  countryFilter?: boolean;
  cityFilter?: boolean;
  categories?: Category[];
  brands?: string[];
  open?: boolean;
}

export interface Category {
  name: string;
  subCategories: Category[];
}

const { Option } = Select;
let countriesOptions = Array();
const countries = Country.getAllCountries();
countries.forEach((element) => {
  countriesOptions.push({
    value: element.isoCode,
    label: element.name,
  });
});
export const ShopProductFilter: React.FC<ShopProductFilterProps> = ({
  priceRange,
  shipping,
  colors,
  locations,
  rating,
  size,
  stockStatus,
  cityFilter,
  countryFilter,
  categories,
  brands,
  open,
}) => {
  const [countryCode, setCountryCode] = useState("");
  const [cities, setCities] = useState<any | []>();
  function handleCountryChange(value: any) {
    setCountryCode(value);
    setCities(City.getCitiesOfCountry(value));
  }

  function renderNested({ name, subCategories }: Category) {
    const haveNestedCategories = subCategories.length > 0;
    if (haveNestedCategories) {
      return (
        <DropdownPanel subPanel={true} name={name}>
          {subCategories.map((cate) => (
            <>{renderNested(cate)}</>
          ))}
        </DropdownPanel>
      );
    } else {
      return <FilterInput variant="box" label={name} />;
    }
  }

  return (
    <div className="flex flex-col gap-2 bg-white">
      {categories && (
        <DropdownPanel
          // contained={true}
          open={open}
          name={t("Category", "Category")}
        >
          {categories.map((cate, i) => (
            <>{renderNested(cate)}</>
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {priceRange && (
        <DropdownPanel open={open} name={t("Price", "Price")}>
          <FilterInput
            variant="range"
            onRangeChange={(r) => console.log(r)}
            min={priceRange.min}
            max={priceRange.max}
          />
          <Spacer />
        </DropdownPanel>
      )}
      {shipping && (
        <DropdownPanel open={open} name={t("Shipping", "Shipping")}>
          {shipping.map((shipping, i) => (
            <FilterInput variant="box" label={shipping} />
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {brands && (
        <DropdownPanel open={open} name={t("Brands", "Brands")}>
          {brands.map((brand, i) => (
            <FilterInput key={i} variant="box" label={brand} />
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {rating && (
        <DropdownPanel open={open} name={t("Rating", "Rating")}>
          {[...Array(5)].map((_, i) => (
            <FlexStack key={i}>
              <FilterInput variant="box" />
              <Rate className="text-sm" disabled value={5 - i} />
            </FlexStack>
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {colors && (
        <DropdownPanel open={open} name={t("Color", "Color")}>
          {colors.map((color, i) => (
            <FlexStack key={i}>
              <FilterInput variant="box" />
              <span
                style={{ backgroundColor: color }}
                className={`h-4 w-4 rounded-sm`}
              ></span>
            </FlexStack>
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {size && (
        <DropdownPanel open={open} name={t("Size", "Size")}>
          {size.map((size, i) => (
            <FilterInput key={i} variant="box" label={size} />
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {stockStatus && (
        <DropdownPanel open={open} name={t("Stock_Status", "Stock Status")}>
          <FilterInput variant="radio" label={t("Available", "Available")} />
          <FilterInput
            name="stock_status"
            variant="radio"
            label={t("Unavailable", "Unavailable")}
          />
          <Spacer />
        </DropdownPanel>
      )}
      {locations && (
        <DropdownPanel open={open} name={t("Store_Location", "Store Location")}>
          {locations.map((location, i) => (
            <FilterInput key={i} variant="box" label={location} />
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {countryFilter && (
        <div className="country-selector">
          <div className=" w-full">
            <Select
              showSearch
              size="large"
              id="countryselect"
              className="react-select-container w-full"
              placeholder={t("Countries", "Countries")}
              onChange={(value) => {
                handleCountryChange(value);
              }}
            >
              {countries.map((item, key: number) => {
                return (
                  <Option key={key} value={item.isoCode}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      )}
      {cityFilter && (
        <div className="city-selector">
          <div className="mb-2 w-full">
            <Select
              showSearch
              size="large"
              id="cityselect"
              className="react-select-container w-full"
              placeholder={t("Cities", "Cities")}
            >
              {cities?.map((item: any, key: number) => {
                return (
                  <Option key={key} value={item.name}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      )}
      <Button text={t("Clear", "Clear")} />
    </div>
  );
};
