
// @ts-nocheck
import { useField, useFormikContext } from "formik";
import React from "react";
import Select, { Props as ReactSelectProps, StylesConfig } from "react-select";
import { OnChangeValue } from "react-select";
interface Option {
  label: string;
  value: string;
  id?:string;
}


interface SelectFieldProps extends Omit<ReactSelectProps, "options" | "onChange" | "name"> {
  label: string;
  name: string;
  options: Option[];
}

export default function SelectField({ label, name, options, onChange, ...props }: SelectFieldProps & { onChange?: (value: string) => void }) {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  const selectedOption = options.find((opt) => opt.value === field.value);

  const customStyles: StylesConfig<Option> = {
    option: (base, state) => ({
      ...base,
      fontSize: "0.875rem",
      color: state.isSelected ? "black" : base.color,
      backgroundColor: state.isSelected ? "#e5e7eb" : base.backgroundColor,
      paddingTop: "6px",
      paddingBottom: "6px",
    }),
    control: (base) => ({
      ...base,
      fontSize: "0.875rem",
      borderColor: "#d1d5db",
    }),
    singleValue: (base) => ({
      ...base,
      color: "black",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
    }),
  };



const handleChange = (option: OnChangeValue<Option, false>) => {
  const value = option ? (option as Option).value : "";
  setFieldValue(name, value);
  if (onChange) onChange(value);
};

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800 mt-2 pt-2">{label}</label>
      <Select
        {...props}
        name={name}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        className={`bg-transparent border ${
          meta.error && meta.touched ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-300"
        }`}
        classNamePrefix="react-select"
      />
      {meta.error && meta.touched && <p className="text-xs text-red-600">{meta.error}</p>}
    </div>
  );
}
