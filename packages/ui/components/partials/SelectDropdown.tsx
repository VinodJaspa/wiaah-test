import React from "react";
import { Select, SelectOption, SelectProps } from "ui";
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
  function handleOptionSelection(value: string) {
    setValue(value);
    if (onSelection) {
      const i = options.findIndex((opt) => opt.value === value);
      onSelection(value, i >= 0 ? i : undefined);
    }
  }

  return (
    <Select
      data-test="SelectDropdown"
      onOptionSelect={handleOptionSelection}
      {...props}
    >
      {options.map((opt, i) => (
        <SelectOption
          key={i}
          data-test="SelectOption"
          className="flex gap-2 text-gray-500"
          value={opt.value}
        >
          {opt.prefix && <opt.prefix />}
          {opt.name}
        </SelectOption>
      ))}
    </Select>
  );
};

export default SelectDropdown;
