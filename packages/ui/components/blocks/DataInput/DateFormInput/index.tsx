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
      {label ? <p className="font-sm pb-2 pt-2">{label}</p> : null}
      <InputGroup {...props}>
        <input
          placeholder={placeholder}
          value={dateValue ? new Date(dateValue).toDateString() : ""}
          className="w-full border-none focus:ring-0 focus:border-none focus-visible:border-none focus-within:border-none active:border-none"

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
                <BiCalendarEdit className="text-sm" />
              </MenuButton>
              <MenuList {...menuProps?.menuListProps}>
                <DateInput
                  value={dateValue ? [new Date(dateValue).toString()] : []}
                  onDaySelect={(date) => {
                    if (isEqual(date, dateValue)) return;
                    if (onDateChange) {
                      onDateChange(date);

                    }
                  }}
                />
              </MenuList>
            </Menu>
          </HStack>
        </InputRightElement>
      </InputGroup>
      <p
        className={`font-sm text-sm pt-0 min-h-[20px] transition-all ${error ? "text-red-500 visible" : "invisible"
          }`}
      >
        {error || "‎" /* invisible empty char to reserve height */}
      </p>

    </div>
  );
};
