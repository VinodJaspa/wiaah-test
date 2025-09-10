import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Select from "react-select";
import {
  Button,
  DropdownPanel,
  FilterInput,
  Spacer,
  HStack,
  ProductNestedCategory,
  FormatCategoryFilters,
} from "ui";
import { Category as ProductCategory } from "../../../features/API";
import { Country, City } from "country-state-city";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";

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
  categories?: ProductCategory[];
  brands?: string[];
  open?: boolean;
}

const countries = Country.getAllCountries();

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
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState("");
  const [cities, setCities] = useState<any | []>();

  function handleCountryChange(selectedOption: any) {
    if (selectedOption) {
      setCountryCode(selectedOption.value);
      setCities(City.getCitiesOfCountry(selectedOption.value));
    } else {
      setCountryCode("");
      setCities([]);
    }
  }

  const _categories = FormatCategoryFilters(categories || []);

  function renderNested({ name, subCategories }: ProductNestedCategory) {
    const haveNestedCategories = subCategories.length > 0;
    if (haveNestedCategories) {
      return (
        <DropdownPanel subPanel={true} name={name}>
          {subCategories.map((cate, i) => (
            <React.Fragment key={i}>{renderNested(cate)}</React.Fragment>
          ))}
        </DropdownPanel>
      );
    } else {
      return <FilterInput variant="box" label={name} />;
    }
  }

  const countryOptions = React.useMemo(() => {
    return countries.map((item) => ({
      value: item.isoCode,
      label: item.name,
    }));
  }, []);

  const cityOptions = React.useMemo(() => {
    return cities?.map((item: any) => ({
      value: item.name,
      label: item.name,
    }));
  }, [cities]);

  return (
    <div className="flex flex-col gap-2 bg-white text-sm">
      {categories && (
        <DropdownPanel
          // contained={true}
          open={open}
          name={t("Category", "Category")}
        >
          {_categories?.map((cate, i) => (
            <React.Fragment key={i}>{renderNested(cate)}</React.Fragment>
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
            <FilterInput key={i} variant="box" label={shipping} />
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
            <HStack key={i} className="py-1">
              <FilterInput variant="box" />
              <ReactStars
                count={5}
                value={5 - i}
                edit={false}
                size={18} // Made stars smaller
                activeColor="#ffd700"
                className="text-sm"
              />
            </HStack>
          ))}
          <Spacer />
        </DropdownPanel>
      )}
      {colors && (
        <DropdownPanel open={open} name={t("Color", "Color")}>
          {colors.map((color, i) => (
            <HStack key={i} className="py-1">
              <FilterInput variant="box" />
              <span
                style={{ backgroundColor: color }}
                className={`h-4 w-4 rounded-sm`}
              ></span>
            </HStack>
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
          <FilterInput variant="radio" label={t("New", "Old")} />
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
        <div className="country-selector w-full py-2">
          <Select
            id="country-select"
            className="react-select-container"
            placeholder={t("Countries", "Countries")}
            onChange={handleCountryChange}
            options={countryOptions}
            classNamePrefix="react-select"
          />
        </div>
      )}
      {cityFilter && (
        <div className="city-selector w-full py-2">
          <Select
            id="city-select"
            className="react-select-container"
            placeholder={t("Cities", "Cities")}
            options={cityOptions}
            isSearchable
            classNamePrefix="react-select"
            isDisabled={!countryCode} // Disable if no country is selected
          />
        </div>
      )}
      <PrimaryButton>{t("clear", "Clear")}</PrimaryButton>
    </div>
  );
};