import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FormOptWithCompType } from "types";
import { DropdownPanel, TranslationText } from "@UI";
import { Field, Form, Formik } from "formik";

export interface ProductOptionsProps { }

export interface ProductOptionsFormValues {
  options: {
    colors: string[];
    sizes: string[];
  };
}

export const ProductOptions: React.FC<ProductOptionsProps> = () => {
  const [selectedOptions, setSelectedOptions] =
    useState<FormOptWithCompType<string[]>[]>(options);
  const { t } = useTranslation();

  const initialValues: ProductOptionsFormValues = {
    options: {
      colors: [],
      sizes: [],
    },
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => { }}>
      {({ values, setFieldValue }) => (
        <Form className="py-4 flex flex-col gap-4">
          {selectedOptions.map((opt, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="bg-gray-200 w-full px-4 py-2 flex justify-between">
                <IoMdCheckmark />
                <TranslationText translationObject={opt.name} />
                <MdClose
                  onClick={() => {
                    const updatedOptions = selectedOptions.filter(
                      (_, index) => index !== i
                    );
                    setSelectedOptions(updatedOptions);
                    setFieldValue(`options.${opt.value}`, []);
                  }}
                  className="cursor-pointer"
                />
              </div>

              <DropdownPanel className="w-[100%]" name={t("colors", "Colors")}>
                {colors.map((color, i) => (
                  <div key={color + i} className="flex gap-4">
                    <Field
                      type="checkbox"
                      name="options.colors"
                      value={color}
                      as="input"
                      checked={values.options.colors}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newColors = e.target.checked
                          ? [...values.options.colors, color]
                          : values.options.colors.filter((c) => c !== color);
                        setFieldValue("options.colors", newColors);
                      }}
                    />
                    <span
                      style={{ backgroundColor: color }}
                      className="w-8 h-8"
                    ></span>
                  </div>
                ))}
              </DropdownPanel>

              <DropdownPanel className="w-[100%]" name={t("sizes", "Sizes")}>
                {sizes.map((size, i) => (
                  <div key={size + i} className="flex gap-4">
                    <Field
                      type="checkbox"
                      name="options.sizes"
                      value={size}
                      as="input"
                      checked={values.options.sizes.includes(size)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newSizes = e.target.checked
                          ? [...values.options.sizes, size]
                          : values.options.sizes.filter((s) => s !== size);
                        setFieldValue("options.sizes", newSizes);
                      }}
                    />
                    <span>{size}</span>
                  </div>
                ))}
              </DropdownPanel>
            </div>
          ))}
        </Form>
      )}
    </Formik>
  );
};

interface AddProductColorsProps {
  values: string[];
  setFieldValue: (field: string, value: any) => void;
}

const AddProductColors: React.FC<AddProductColorsProps> = ({
  values,
  setFieldValue,
}) => {
  const { t } = useTranslation();

  return (
    <DropdownPanel className="w-[100%]" name={t("colors", "Colors")}>
      {colors.map((color, i) => (
        <div key={color + i} className="flex gap-4">
          <Field
            type="checkbox"
            name="options.colors"
            value={color}
            as="input"
            checked={values.includes(color)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newColors = e.target.checked
                ? [...values, color]
                : values.filter((c) => c !== color);
              setFieldValue("options.colors", newColors);
            }}
          />
          <span style={{ backgroundColor: color }} className="w-8 h-8"></span>
        </div>
      ))}
    </DropdownPanel>
  );
};

interface AddProductSizesProps {
  values: string[];
  setFieldValue: (field: string, value: any) => void;
}

const AddProductSizes: React.FC<AddProductSizesProps> = ({
  values,
  setFieldValue,
}) => {
  const { t } = useTranslation();

  return (
    <DropdownPanel className="w-[100%]" name={t("sizes", "Sizes")}>
      {sizes.map((size, i) => (
        <div key={size + i} className="flex gap-4">
          <Field
            type="checkbox"
            name="options.sizes"
            value={size}
            as="input"
            checked={values.includes(size)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newSizes = e.target.checked
                ? [...values, size]
                : values.filter((s) => s !== size);
              setFieldValue("options.sizes", newSizes);
            }}
          />
          <span>{size}</span>
        </div>
      ))}
    </DropdownPanel>
  );
};

const options: FormOptWithCompType<string[]>[] = [
  {
    name: {
      translationKey: "colors",
      fallbackText: "Colors",
    },
    value: "colors",
    component: AddProductColors,
  },
  {
    name: {
      translationKey: "sizes",
      fallbackText: "Sizes",
    },
    value: "sizes",
    component: AddProductSizes,
  },
];

const sizes: string[] = ["small", "medium", "large", "x-large", "xx-large"];

const colors: string[] = [
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
