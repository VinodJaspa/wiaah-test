import React from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Select,
  SelectOption,
  Button,
  ShippingSettingsContext,
} from "ui";
import { Country } from "country-state-city";

export interface ShippingSettingsProps {}

let countriesArray = Country.getAllCountries().map((element) => ({
  value: element.isoCode,
  label: element.name,
}));

export const NewShippingSettings: React.FC<ShippingSettingsProps> = () => {
  const { t } = useTranslation();
  const { cancelAddNew } = React.useContext(ShippingSettingsContext);
  let [shippingMethode, setShippingMethod] = React.useState(false);

  function handleAddMothed() {
    cancelAddNew();
  }
  return (
    <div>
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Enter_shipping_details", "Enter shipping details")}
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between lg:mt-6">
          <div className="mr-2 w-6/12">
            <label htmlFor="">{t("Sending_Country", "Sending Country")}</label>
            <Select id="sending-country" placeholder={t("Country", "Country")}>
              {countriesArray.map(({ label, value }, i) => (
                <SelectOption key={i} value={value}>
                  {label}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div className="ml-2 w-6/12">
            <label htmlFor="">{t("Treatment_Time", "Treatment Time")}</label>
            <Select placeholder={t("Treatment_Time", "Treatment Time")}>
              <SelectOption value="1-3">1-3 {t("days", "days")}</SelectOption>
              <SelectOption value="3-5">3-5 {t("days", "days")}</SelectOption>
              <SelectOption value="7">7 {t("days", "days")}</SelectOption>
              <SelectOption value="1-2weeks">
                1-2 {t("Weeks", "Weeks")}
              </SelectOption>
              <SelectOption value="2-3weeks">
                2-3 {t("Weeks", "Weeks")}
              </SelectOption>
              <SelectOption value="3-4weeks">
                3-4 {t("Weeks", "Weeks")}
              </SelectOption>
            </Select>
          </div>
        </div>
        {shippingMethode && (
          <div className="flex flex-col gap-4 w-full rounded-lg bg-slate-100 ">
            <div>
              <label htmlFor="">{t("Destination", "Destination")}</label>
              <Select
                id="destination-country"
                placeholder={t("Destination", "Destination")}
              >
                {countriesArray.map(({ label, value }, i) => (
                  <SelectOption key={i} value={value}>
                    {label}
                  </SelectOption>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="">{t("Transporter", "Transporter")}</label>
              <Input placeholder={t("Name", "Name") + "*"} />
            </div>
            <div className="">
              <label htmlFor="">{t("Delivery_Time", "Delivery Time")}</label>
              <Select placeholder={t("Delivery_Time", "Delivery Time")}>
                <SelectOption value="1-3">1-3 {t("days", "days")}</SelectOption>
                <SelectOption value="3-5">3-5 {t("days", "days")}</SelectOption>
                <SelectOption value="7">7 {t("days", "days")}</SelectOption>
                <SelectOption value="1-2weeks">
                  1-2 {t("Weeks", "Weeks")}
                </SelectOption>
                <SelectOption value="2-3weeks">
                  2-3 {t("Weeks", "Weeks")}
                </SelectOption>
                <SelectOption value="3-4weeks">
                  3-4 {t("Weeks", "Weeks")}
                </SelectOption>
              </Select>
            </div>
            <div className="">
              <label htmlFor="">
                {t("Type_of_Shipping", "Type of Shipping")}
              </label>
              <Select placeholder={t("Type_of_Shipping", "Type of Shipping")}>
                <SelectOption value="1-3">{t("One", "One")}</SelectOption>
                <SelectOption value="3-5">{t("Two", "Two")}</SelectOption>
              </Select>
            </div>
            <div>
              <label htmlFor="">{t("Price", "Price")}</label>
              <Input placeholder={t("Price", "Price")} />
            </div>
            <div>
              <label htmlFor="">
                {t("Price_by_Additional_Item", "Price by Additional Item")}
              </label>
              <Input
                className="mb-4 mt-2 rounded-md border-gray-300"
                placeholder={t("Price", "Price")}
              />
            </div>
            <div className="w-full justify-between flex gap-4">
              <Button
                className="bg-red-400 hover:bg-red-500 active:bg-red-600"
                onClick={() => {
                  setShippingMethod(false);
                }}
              >
                {t("Remove", "Remove")}
              </Button>
              <Button
                onClick={handleAddMothed}
                className=" rounded-md py-2 px-4 text-white"
              >
                {t("Save", "Save")}
              </Button>
            </div>
          </div>
        )}
        {!shippingMethode && (
          <Button
            className="w-fit"
            onClick={() => {
              setShippingMethod(true);
            }}
          >
            {t("Add_Method", "Add Method")}
          </Button>
        )}
      </div>
    </div>
  );
};
