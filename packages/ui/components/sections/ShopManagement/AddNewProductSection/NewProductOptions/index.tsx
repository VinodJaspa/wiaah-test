"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";
import { DropdownPanel } from "@partials";

export interface ProductOptionsProps {
  onValid?: (values: Record<string, any>) => any;
  validationSchema?: Yup.AnySchema;
}

interface ProductOptionsFormValues {
  colors: string[];
  sizes: string[];
}

export const colors: string[] = [
  "#2271B3",
  "#734222",
  "#9D9101",
  "#287233",
  "#B32821",
  "#5B3A29",
  "#6C3B2A",
  "#ED760E",
  "#C93C20",
  "#E7EBDA",
];

export const sizes: string[] = [
  "small",
  "medium",
  "large",
  "xlarge",
  "xxlarge",
];

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  onValid,
  validationSchema,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const initialValues: ProductOptionsFormValues = {
    colors: [],
    sizes: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      {({ values, setFieldValue, errors }) => {
        onValid && onValid(values);
        return (
          <Form className="space-y-4">
            <DropdownPanel name={t("colors", "Colors")} className="w-full">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <IoMdCheckmark className="mr-2 h-4 w-4" />
                  <span>{t("colors", "Colors")}</span>
                </div>
                <MdClose
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setFieldValue("colors", [])}
                />
              </div>
              <div className="grid grid-cols-5 gap-4">
                {colors.map((color, index) => (
                  <div
                    key={color + index}
                    className="flex flex-col items-center gap-2"
                  >
                    <Field
                      type="checkbox"
                      name="colors"
                      value={color}
                      checked={values.colors.includes(color)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newColors = e.target.checked
                          ? [...values.colors, color]
                          : values.colors.filter((c) => c !== color);
                        setFieldValue("colors", newColors);
                      }}
                      className="sr-only"
                      id={`color-${color}`}
                    />
                    <label
                      htmlFor={`color-${color}`}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${values.colors.includes(color)
                          ? "border-primary"
                          : "border-transparent"
                        }`}
                      style={{ backgroundColor: color }}
                    ></label>
                  </div>
                ))}
              </div>
              {/* Display color errors */}
              {errors.colors && (
                <div className="text-red-500 text-sm mt-2">{errors.colors}</div>
              )}
            </DropdownPanel>

            <DropdownPanel name={t("sizes", "Sizes")} className="w-full">
              <div className="flex justify-between items-center w-full mb-4">
                <div className="flex items-center">
                  <IoMdCheckmark className="mr-2 h-4 w-4" />
                  <span className="text-lg font-medium">
                    {t("sizes", "Sizes")}
                  </span>
                </div>
                <MdClose
                  className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setFieldValue("sizes", [])}
                />
              </div>
              <div className="flex flex-col gap-4 ml-2">
                {sizes.map((size, index) => (
                  <div
                    key={size + index}
                    className="flex items-center space-x-3"
                  >
                    <Field
                      type="checkbox"
                      name="sizes"
                      value={size}
                      checked={values.sizes.includes(size)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newSizes = e.target.checked
                          ? [...values.sizes, size]
                          : values.sizes.filter((s) => s !== size);
                        setFieldValue("sizes", newSizes);
                      }}
                      id={`size-${size}`}
                    />
                    <span className="text-sm text-gray-700">{size}</span>
                  </div>
                ))}
              </div>

              {/* Display size errors */}
              {errors.sizes && (
                <div className="text-red-500 text-sm mt-2">{errors.sizes}</div>
              )}
            </DropdownPanel>
          </Form>
        );
      }}
    </Formik>
  );
};
