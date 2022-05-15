import React from "react";
import { useTranslation } from "react-i18next";
import { Input, Checkbox, Select as AntSelect } from "antd";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

export interface ShippingSettingsProps {}

let countriesArray = Array();
const countries = Country.getAllCountries();
countries.forEach((element) => {
  countriesArray.push({
    value: element.isoCode,
    label: element.name,
  });
});
const { Option } = AntSelect;

export const ShippingSettings: React.FC<ShippingSettingsProps> = () => {
  const { t } = useTranslation();
  let [shippingMethode, setShippingMethod] = React.useState(false);

  return (
    <div>
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Enter_shipping_details", "Enter shipping details")}
      </h2>
      <div>
        <div className="flex justify-between lg:mt-6">
          <div className="mr-2 w-6/12">
            <label htmlFor="">{t("Sending_Country", "Sending Country")}</label>
            <Select
              id="sending-country"
              instanceId="sending-country"
              className="react-select-container mt-2 mb-4 rounded-md border-gray-300"
              classNamePrefix="react-select"
              options={countriesArray}
              placeholder={t("Country", "Country")}
            />
          </div>
          <div className="ml-2 w-6/12">
            <label htmlFor="">{t("Treatment_Time", "Treatment Time")}</label>
            <AntSelect
              placeholder={t("Treatment_Time", "Treatment Time")}
              className="mt-2 mb-4 w-full rounded-md border-gray-300"
              size="large"
            >
              <Option value="1-3">1-3 {t("days", "days")}</Option>
              <Option value="3-5">3-5 {t("days", "days")}</Option>
              <Option value="7">7 {t("days", "days")}</Option>
              <Option value="1-2weeks">1-2 {t("Weeks", "Weeks")}</Option>
              <Option value="2-3weeks">2-3 {t("Weeks", "Weeks")}</Option>
              <Option value="3-4weeks">3-4 {t("Weeks", "Weeks")}</Option>
            </AntSelect>
          </div>
        </div>
        {shippingMethode && (
          <div className="mr-4 mb-8 w-full rounded-lg bg-slate-100 p-4">
            <div>
              <label htmlFor="">{t("Destination", "Destination")}</label>
              <Select
                id="destination-country"
                instanceId="destination-country"
                className="react-select-container mt-2 mb-4 rounded-md border-gray-300"
                classNamePrefix="react-select"
                options={countriesArray}
                placeholder={t("Destination", "Destination")}
              />
            </div>
            <div>
              <label htmlFor="">{t("Transporter", "Transporter")}</label>
              <Input
                className="mb-4 mt-2 rounded-md border-gray-300"
                size="large"
                placeholder={t("Name", "Name") + "*"}
              />
            </div>
            <div className="">
              <label htmlFor="">{t("Delivery_Time", "Delivery Time")}</label>
              <AntSelect
                placeholder={t("Delivery_Time", "Delivery Time")}
                className="mt-2 mb-4 w-full rounded-md border-gray-300"
                size="large"
              >
                <Option value="1-3">1-3 {t("days", "days")}</Option>
                <Option value="3-5">3-5 {t("days", "days")}</Option>
                <Option value="7">7 {t("days", "days")}</Option>
                <Option value="1-2weeks">1-2 {t("Weeks", "Weeks")}</Option>
                <Option value="2-3weeks">2-3 {t("Weeks", "Weeks")}</Option>
                <Option value="3-4weeks">3-4 {t("Weeks", "Weeks")}</Option>
              </AntSelect>
            </div>
            <div className="">
              <label htmlFor="">
                {t("Type_of_Shipping", "Type of Shipping")}
              </label>
              <AntSelect
                placeholder={t("Type_of_Shipping", "Type of Shipping")}
                className="mt-2 mb-4 w-full rounded-md border-gray-300"
                size="large"
              >
                <Option value="1-3">{t("One", "One")}</Option>
                <Option value="3-5">{t("Two", "Two")}</Option>
              </AntSelect>
            </div>
            <div>
              <label htmlFor="">{t("Price", "Price")}</label>
              <Input
                className="mb-4 mt-2 rounded-md border-gray-300"
                size="large"
                placeholder={t("Price", "Price")}
              />
            </div>
            <div>
              <label htmlFor="">
                {t("Price_by_Additional_Item", "Price by Additional Item")}
              </label>
              <Input
                className="mb-4 mt-2 rounded-md border-gray-300"
                size="large"
                placeholder={t("Price", "Price")}
              />
            </div>
            <div>
              <button className="green-background rounded-md py-2 px-4 text-white">
                {t("Save", "Save")}
              </button>
              <button
                className="ml-4 rounded-md bg-red-400 py-2 px-4 text-white"
                onClick={() => {
                  setShippingMethod(false);
                }}
              >
                {t("Remove", "Remove")}
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-start">
          <button
            className="rounded-md bg-gray-200 py-2 px-4"
            onClick={() => {
              setShippingMethod(true);
            }}
          >
            {t("Add_Method", "Add Method")}
          </button>
        </div>
      </div>
    </div>
  );
};
