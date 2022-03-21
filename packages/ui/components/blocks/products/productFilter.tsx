import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Country, City } from "country-state-city";
import { t } from "i18next";
import { Select, Slider, Collapse, Tree } from "antd";

const { Option } = Select;
const { Panel } = Collapse;

interface ProductFilterProps {
  priceRange?: { min: number; max: number };
  shipping?: Array<{ label: string; value: string }>;
  brands?: Array<{ label: string; value: string }>;
  colors?: Array<string>;
}

let countriesOptions = Array();
const countries = Country.getAllCountries();
countries.forEach((element) => {
  countriesOptions.push({
    value: element.isoCode,
    label: element.name,
  });
});

export const ProductFilter: React.FC<ProductFilterProps> = ({
  priceRange = { min: 0, max: 1000 },
  shipping = [
    {
      label: t("Click_and_Collect", "Click and Collect"),
      value: "click_and_collect",
    },
    { label: t("Free", "Free"), value: "free" },
    { label: t("International", "International"), value: "international" },
  ],
  brands = [],
  colors = [],
}) => {
  let [minPrice, setMinPrice] = useState(priceRange.min);
  let [maxPrice, setMaxPrice] = useState(priceRange.max);
  let [countryCode, setCountryCode] = useState("");
  let [cities, setCities] = useState<any | []>();

  function handleCountryChange(value: any) {
    setCountryCode(value);
    setCities(City.getCitiesOfCountry(value));
  }
  function handlePriceRangeChange(price: any) {
    setMinPrice(price[0]);
    setMaxPrice(price[1]);
  }

  const treeData = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          disabled: true,
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              disableCheckbox: true,
            },
            {
              title: "leaf",
              key: "0-0-0-1",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [
            {
              title: <span style={{ color: "#1890ff" }}>sss</span>,
              key: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Collapse ghost expandIconPosition="right">
        <Panel
          className="filter-panel"
          header={t("Category", "Category")}
          key="6"
        >
          <Tree treeData={treeData}></Tree>
        </Panel>
        <Panel
          className="filter-panel"
          header={t("Price", "Price") + " ($)"}
          key="1"
        >
          <Slider
            className=""
            min={priceRange.min}
            max={priceRange.max}
            onChange={handlePriceRangeChange}
            trackStyle={[
              { backgroundColor: "#57bf9c" },
              { borderColor: "#57bf9c" },
            ]}
            range
            defaultValue={[priceRange.min, priceRange.max]}
          />
          <div className="flex justify-between">
            <div>{minPrice + " $"}</div>
            <div>{maxPrice + " $"}</div>
          </div>
        </Panel>
        <Panel
          className="filter-panel"
          header={t("Shipping", "Shipping")}
          key="2"
        >
          {shipping.map((item, i: number) => (
            <div className="justify-left mb-2 flex items-center" key={i}>
              <input
                name="shipping"
                type="radio"
                value={item.value}
                className="rounded text-pink-500"
              />
              <span className="ml-2 text-xs">{item.label}</span>
            </div>
          ))}
        </Panel>
        <Panel className="filter-panel" header={t("Brand", "Brand")} key="3">
          {brands.map((item, i: number) => (
            <div key={i} className="justify-left mb-2 flex items-center">
              <input
                type="checkbox"
                value={item.value}
                className="rounded text-pink-500"
              />
              <span className="ml-2 text-xs">{item.label}</span>
            </div>
          ))}
        </Panel>
        <Panel className="filter-panel" header={t("Rating", "Rating")} key="4">
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <AiFillStar className="ml-2 inline text-orange-500" />
          </div>
        </Panel>
        <Panel className="filter-panel" header={t("Color", "Color")} key="5">
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <div className="ml-2 inline-block h-4 w-4 border bg-red-500"></div>
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <div className="ml-2 inline-block h-4 w-4 border bg-green-500"></div>
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <div className="ml-2 inline-block h-4 w-4 border bg-yellow-500"></div>
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <div className="ml-2 inline-block h-4 w-4 border bg-gray-500"></div>
          </div>
          <div className="justify-left mb-2 flex items-center">
            <input type="checkbox" className="rounded text-pink-500" />
            <div className="ml-2 inline-block h-4 w-4 border bg-white"></div>
          </div>
        </Panel>
      </Collapse>
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
      <button className="mt-5 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-green-400 p-3 text-white">
        {t("Clear", "Clear")}
      </button>
    </>
  );
};
