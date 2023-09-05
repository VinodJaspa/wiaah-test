import React from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Button,
  useUpdateShippingRuleMutation,
  useCreateShippingRulesMutation,
  Table,
  THead,
  Tr,
  Td,
  Select,
  SelectOption,
  useGetShippingRuleById,
} from "@UI";
import { mapArray, useForm } from "@UI/../utils/src";
import { ShippingDestination, ShippingType } from "@features/API";
import { startCase } from "lodash";

export interface ShippingSettingsProps {
  onSuccess: () => any;
  id?: string;
}

export type ShippingSettingsRefProps = {
  submit: () => any;
};

export const NewShippingSettings = React.forwardRef<
  ShippingSettingsRefProps,
  any
>(({ onSuccess, id }: ShippingSettingsProps, ref) => {
  const { t } = useTranslation();

  const isEdit = typeof id === "string";

  const { mutate: updateRule } = useUpdateShippingRuleMutation();
  const { mutate: addRule } = useCreateShippingRulesMutation();
  const {} = useGetShippingRuleById(
    { id: id! },
    {
      enabled: isEdit,
      onSuccess: (data) =>
        setInitialData({
          ...data,
          countries: [],
        }),
    }
  );

  const { form, inputProps, selectProps, handleChange, setInitialData } =
    useForm<Parameters<typeof addRule>[0]>({
      cost: 0,
      destination: ShippingDestination.Local,
      countries: [],
      shippingCompanyName: "",
      deliveryTimeRange: { from: 0, to: 1 },
      name: "",
      shippingType: ShippingType.Paid,
    });

  function handleSubmit() {
    if (isEdit) {
      addRule(form, { onSuccess });
    } else {
      updateRule(
        { ...form, id: id! },
        {
          onSuccess,
        }
      );
    }
  }

  React.useImperativeHandle<ShippingSettingsRefProps, any>(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <div className="flex flex-col px-2 gap-2">
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Enter shipping details")}
      </h2>

      <div className="font-medium flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p>{t("Shipping name")}</p>
          <Input {...inputProps("name")} />
        </div>
        <div className="flex flex-col gap-2">
          <p>{t("Shipping type")}</p>
          <Select {...selectProps("shippingType")}>
            {Object.values(ShippingType).map((v, i) => (
              <SelectOption key={i} value={v}>
                {startCase(v)}
              </SelectOption>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <p>{t("Shipping company name")}</p>
          <Input {...inputProps("shippingCompanyName")} />
        </div>
        {form.shippingType === ShippingType.Paid ? (
          <div className="flex flex-col gap-2">
            <p>{t("Shipping fixed price")}</p>
            <Input {...inputProps("cost")} />
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <p>{t("Shipping destination")}</p>
          <Select {...selectProps("destination")}>
            {mapArray(Object.values(ShippingDestination), (v, i) => (
              <SelectOption value={v} key={i}>
                {v}
              </SelectOption>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <p>{t("Shipping Time")}</p>
          <Select
            onOptionSelect={(v) => {
              handleChange("deliveryTimeRange", {
                from: parseInt(v[0]),
                to: parseInt(v[1]),
              });
            }}
            placeholder={t("Shipping Time")}
          >
            <SelectOption value={[1, 3]}>1-3 {t("days", "days")}</SelectOption>
            <SelectOption value={[3, 5]}>3-5 {t("days", "days")}</SelectOption>
            <SelectOption value={[5, 7]}>5-7 {t("days", "days")}</SelectOption>
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
});
