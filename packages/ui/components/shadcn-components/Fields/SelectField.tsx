import { useField, useFormikContext } from "formik";
import React from "react";
import Select, { Props as ReactSelectProps, StylesConfig } from "react-select";

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

export default function SelectField({ label, name, options, ...props }: SelectFieldProps) {
  const [field, meta,helpers] = useField(name);
  const { setFieldValue } = useFormikContext<any>();
  // React.useEffect(() => {
  //   // For example, clear error on mount:
  //   helpers.setError('');
  // }, [helpers]); 
  // console.log(helpers ,"helpers");
  

  

  const selectedOption = options.find((opt) => opt.value === field.value);

  const customStyles: StylesConfig<Option> = {
    option: (base, state) => ({
      ...base,
      fontSize: "0.875rem", // text-sm
      color: state.isSelected ? "black" : base.color,
      backgroundColor: state.isSelected ? "#e5e7eb" : base.backgroundColor, // Tailwind's gray-200
      paddingTop: "6px",
      paddingBottom: "6px",
    }),
    control: (base) => ({
      ...base,
      fontSize: "0.875rem", // text-sm
      borderColor: "#d1d5db", // gray-300
    }),
    singleValue: (base) => ({
      ...base,
      color: "black",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20, // to ensure dropdown overlaps properly
    }),
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800 mt-2 pt-2">{label}</label>
      <Select
        {...props}
        name={name}
        value={selectedOption}
        onChange={(option) => setFieldValue(name, (option as Option)?.value)}
        options={options}
        styles={customStyles}
        className={`bg-transparent border
          ${
            meta.error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-300"
          }
        `}
        
   
        classNamePrefix="react-select"
      />
      {meta.error && (
        <p className="text-xs text-red-600">{meta.error}</p>
      )}
    </div>
  );
}
