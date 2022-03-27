import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectDropdownProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  name?: string;
  onSelection?: (value: string, index: number | undefined) => void;
  options: option[];
  fullWidth?: boolean;
  initialValue?: string | undefined;
}
interface option {
  name: string;
  value: string;
  prefix?: () => React.ReactElement;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  name,
  onSelection,
  options = [],
  fullWidth = false,
  initialValue,
  ...props
}) => {
  const [value, setValue] = React.useState<string | undefined>(initialValue);
  function handleOptionSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    if (e.target.value === name) return;

    if (onSelection) {
      const i = options.findIndex((opt) => opt.value === e.target.value);
      onSelection(e.target.value, i >= 0 ? i : undefined);
    }
  }

  return (
    <select
      data-test="SelectDropdown"
      style={fullWidth ? { width: "100%" } : {}}
      value={value}
      className="w-56 rounded-md border-[1px] border-gray-500 border-opacity-50  pr-10 font-semibold capitalize text-gray-500"
      onChange={handleOptionSelection}
      {...props}
    >
      {name && (
        <option data-test="SelectHeader" className="text-gray-500 " selected>
          {name}
        </option>
      )}
      {options.map((opt, i) => (
        <option
          key={i}
          data-test="SelectOption"
          className="flex gap-2 text-gray-500"
          value={opt.value}
        >
          {opt.prefix && <opt.prefix />}
          {opt.name}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
