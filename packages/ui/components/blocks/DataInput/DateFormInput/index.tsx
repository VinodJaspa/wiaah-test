import {
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  HStack,
  MenuProps,
  MenuButtonProps,
  MenuListProps,
  InputProps,
  InputGroupProps,
} from "@partials";
import { DateInput } from "../DateInput";
import React from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { isEqual } from "lodash";

export interface DateFormInputProps extends InputGroupProps {
  placeholder?: string;
  onDateChange?: (date?: string) => any;
  dateValue?: string | number;
  menuProps?: {
    menuListProps?: MenuListProps;
    menuProps?: MenuProps;
    menuButtonProps?: MenuButtonProps;
  };
  inputProps?: InputProps;
  label?: string;
  error?: string;
}

export const DateFormInput: React.FC<DateFormInputProps> = ({
  placeholder,
  menuProps,
  dateValue,
  onDateChange,
  error,
  label,
  ...props
}) => {
  return (
    <div className="w-full">
      {label ? <p className="font-semibold pb-1">{label}</p> : null}
      <InputGroup {...props}>
        <Input
          placeholder={placeholder}
          value={dateValue ? new Date(dateValue).toDateString() : ""}
          className="w-full"
          readOnly
        />
        <InputRightElement className="px-2">
          <HStack>
            {dateValue ? (
              <MdClose
                className="cursor-pointer"
                onClick={() => onDateChange && onDateChange()}
              />
            ) : null}
            <Menu {...menuProps?.menuProps}>
              <MenuButton {...menuProps?.menuButtonProps}>
                <BiCalendarEdit className="text-xl" />
              </MenuButton>
              <MenuList {...menuProps?.menuListProps}>
                <DateInput
                  value={dateValue ? [new Date(dateValue).toString()] : []}
                  onDaySelect={(date) => {
                    if (isEqual(date, dateValue)) return;
                    onDateChange && onDateChange(date);
                  }}
                />
              </MenuList>
            </Menu>
          </HStack>
        </InputRightElement>
      </InputGroup>
      {error ? (
        <p className="font-semibold text-red-500 text-lg pt-1">{error}</p>
      ) : null}
    </div>
  );
};
