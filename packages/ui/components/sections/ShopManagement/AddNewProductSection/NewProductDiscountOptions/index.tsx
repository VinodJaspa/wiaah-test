import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarEdit } from "react-icons/bi";
import { Menu, MenuButton, MenuList, DateInput, Select, Input } from "@UI";
import { SelectOption } from "@UI";
import { format } from "date-fns";
import * as Yup from "yup";

export interface NewProductDiscountOptionsProps {
  onChange?: (props: any) => any;
  validationSchema?: Yup.AnySchema;
}

const MAX_DISCOUNT = 100;
const DISCOUNT_INCREMENTAL = 5;

export const NewProductDiscountOptions: React.FC<
  NewProductDiscountOptionsProps
> = ({ onChange, validationSchema }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="flex flex-col gap-4 pb-24">
      <h1 className="text-xl font-bold">
        {t("create_discount_code", "Create Discount Code")}
      </h1>
      <Formik
        initialValues={{
          percentOff: 0,
          units: 0,
          startDate: "",
          endDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={() => { }}
      >
        {({ setFieldValue, values, errors }) => {
          onChange && onChange(values);
          return (
            <Form className="flex flex-col gap-4">
              <div>
                <Select
                  onOptionSelect={(opt) =>
                    setFieldValue("percentOff", parseInt(opt))
                  }
                  placeholder={t("percent_off", "Percent OFF")}
                >
                  {[...Array(MAX_DISCOUNT / DISCOUNT_INCREMENTAL)].map(
                    (_, i) => (
                      <SelectOption key={i} value={i * DISCOUNT_INCREMENTAL}>
                        {i * DISCOUNT_INCREMENTAL}%
                      </SelectOption>
                    ),
                  )}
                </Select>
                {errors.percentOff && (
                  <p className="text-red-500 text-sm">
                    {errors.percentOff as string}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="number"
                  placeholder={t("Units")}
                  onChange={(e) =>
                    setFieldValue("units", parseInt(e.target.value, 10))
                  }
                />
                {errors.units && (
                  <p className="text-red-500 text-sm">{errors.units}</p>
                )}
              </div>
              <div className="flex gap-4 px-1 py-1 w-full border-[1px] items-center border-gray-300">
                <Menu>
                  <MenuButton>
                    <BiCalendarEdit className="cursor-pointer text-2xl" />
                  </MenuButton>
                  <MenuList className="left-0 origin-top-left">
                    <DateInput
                      onDaySelect={(date) => setFieldValue("startDate", date)}
                    />
                  </MenuList>
                </Menu>
                <p>
                  {values.startDate
                    ? format(new Date(values.startDate), "yyyy-MM-dd")
                    : t("start_date", "Start Date")}
                </p>
              </div>
              {errors.startDate && (
                <p className="text-red-500 text-sm">{errors.startDate}</p>
              )}
              <div className="flex gap-4 px-1 py-1 w-full border-[1px] items-center border-gray-300">
                <Menu>
                  <MenuButton>
                    <BiCalendarEdit className="cursor-pointer text-2xl" />
                  </MenuButton>
                  <MenuList className="left-0 origin-top-left">
                    <DateInput
                      onDaySelect={(date) => setFieldValue("endDate", date)}
                    />
                  </MenuList>
                </Menu>
                <p>
                  {values.endDate
                    ? format(new Date(values.endDate), "yyyy-MM-dd")
                    : t("end_date", "End Date")}
                </p>
              </div>
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate}</p>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
