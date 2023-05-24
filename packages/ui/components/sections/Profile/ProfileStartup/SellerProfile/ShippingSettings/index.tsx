import React from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Select,
  SelectOption,
  Button,
  ShippingSettingsContext,
  MultiChooseInput,
  useUpdateShippingRuleMutation,
  useCreateShippingRulesMutation,
  HStack,
  InputGroup,
  InputLeftElement,
  SearchIcon,
  Badge,
  FlagIcon,
  CloseIcon,
} from "@UI";
import { Country } from "country-state-city";
import { mapArray, useForm } from "@UI/../utils/src";
import { ShippingType } from "@features/API";

export interface ShippingSettingsProps {
  onSuccess: () => any;
}

let countriesArray = Country.getAllCountries().map((element) => ({
  value: element.isoCode,
  label: element.name,
}));

export const NewShippingSettings = React.forwardRef(
  ({ onSuccess }: ShippingSettingsProps, ref) => {
    const { t } = useTranslation();
    const { cancelAddNew, isAddNew, editId } = React.useContext(
      ShippingSettingsContext
    );
    let [shippingMethode, setShippingMethod] = React.useState(false);

    const { mutate: updateRule } = useUpdateShippingRuleMutation();
    const { mutate: addRule } = useCreateShippingRulesMutation();

    function handleAddMethod() {
      cancelAddNew();
    }

    const { form, handleChange } = useForm<Parameters<typeof addRule>[0]>({
      cost: 0,
      countries: [],
      deliveryTimeRange: { from: 0, to: 1 },
      name: "",
      shippingType: ShippingType.Paid,
    });

    React.useImperativeHandle(ref, () => ({
      submit: () => {
        addRule(form, { onSuccess });
      },
    }));

    return (
      <div className="flex flex-col gap-2">
        <h2 className="hidden text-xl font-bold lg:block">
          {t("Enter shipping details")}
        </h2>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon></SearchIcon>
          </InputLeftElement>
          <MultiChooseInput
            onChange={(e) => {
              handleChange(
                "countries",
                form.countries.concat(e.map((v) => ({ code: v })))
              );
            }}
            value={[]}
            suggestions={countriesArray.map((v, i) => ({
              label: v.label,
              value: v.value,
            }))}
            placeholder={t("Search for countries")}
          />
        </InputGroup>
        <div className="flex flex-col gap-2">
          <label>{t("Selected Countries")}</label>
          <div className="flex flex-wrap gap-2">
            {mapArray(form.countries, (v, i) => (
              <Badge className="w-fit gap-2">
                <FlagIcon size={24} key={i} code={v.code}></FlagIcon>
                <p className="text-sm">
                  {countriesArray.find((c) => c.value === v.code)?.label}
                </p>
                <button
                  onClick={() =>
                    handleChange(
                      "countries",
                      form.countries.filter((c) => c.code !== v.code)
                    )
                  }
                >
                  <CloseIcon className="text-white bg-black rounded-full" />
                </button>
              </Badge>
            ))}
          </div>

          <HStack>
            <div className="w-full">
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

            <div className="w-full">
              <label htmlFor="">{t("Price", "Price")}</label>
              <Input placeholder={t("Price", "Price")} />
            </div>
          </HStack>

          <Button
            colorScheme="darkbrown"
            className="w-fit self-end mt-4"
            onClick={() => {
              setShippingMethod(true);
            }}
          >
            {t("Add_Method", "Add Method")}
          </Button>
          {/* <div className="flex justify-between lg:mt-6">
          <div className="mr-2 w-6/12">
          
  
          </div>
          <div className="ml-2 w-6/12">
            <label htmlFor="">{t("Treatment_Time", "Treatment Time")}</label>
            <Select
              onOptionSelect={(v) => {
                handleSetForm("deliveryTimeRange", {
                  from: parseInt(v[0]),
                  to: parseInt(v[1]),
                });
              }}
              placeholder={t("Treatment_Time", "Treatment Time")}
            >
              <SelectOption value={[1, 3]}>
                1-3 {t("days", "days")}
              </SelectOption>
              <SelectOption value={[3, 5]}>
                3-5 {t("days", "days")}
              </SelectOption>
              <SelectOption value={[5, 7]}>
                5-7 {t("days", "days")}
              </SelectOption>
              <SelectOption value={[7, 14]}>
                1-2 {t("Weeks", "Weeks")}
              </SelectOption>
              <SelectOption value={[14, 21]}>
                2-3 {t("Weeks", "Weeks")}
              </SelectOption>
              <SelectOption value={[21, 28]}>
                3-4 {t("Weeks", "Weeks")}
              </SelectOption>
            </Select>
          </div>
        </div> */}
          {/* <div className="flex flex-col gap-4 w-full rounded-lg bg-slate-100 ">
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
          <div className=""></div>
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
            <label htmlFor="">
              {t("Price_by_Additional_Item", "Price by Additional Item")}
            </label>
            <Input
              className="mb-4 mt-2 rounded-md border-gray-300"
              placeholder={t("Price", "Price")}
            />
          </div> */}
          {/* <div className="w-full justify-between flex gap-4">
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
          </div> */}
        </div>
        {/* {!shippingMethode && (

        )} */}
        {/* </div> */}
      </div>
    );
  }
);
