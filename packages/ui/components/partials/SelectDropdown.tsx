import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { Select, SelectProps } from "@chakra-ui/react";

export interface SelectDropdownProps extends SelectProps {
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
    if (onSelection) {
      const i = options.findIndex((opt) => opt.value === e.target.value);
      onSelection(e.target.value, i >= 0 ? i : undefined);
    }
  }

  return (
    <Select
      data-test="SelectDropdown"
      value={value}
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
    </Select>
  );
};

export default SelectDropdown;
