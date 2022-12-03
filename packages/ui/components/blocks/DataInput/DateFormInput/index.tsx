import {
  DateInput,
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
} from "ui";
import React from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { MdClose } from "react-icons/md";

export interface DateFormInputProps {
  placeholder?: string;
  onDateChange?: (date: string) => any;
  dateValue?: string | number;
  menuProps?: {
    menuListProps?: MenuListProps;
    menuProps?: MenuProps;
    menuButtonProps?: MenuButtonProps;
  };
}

export const DateFormInput: React.FC<DateFormInputProps> = ({
  placeholder,
  menuProps,
  dateValue,
  onDateChange,
  ...props
}) => {
  const [date, setDate] = React.useState<string>("");

  React.useEffect(() => {
    if (dateValue) {
      setDate(new Date(dateValue).toUTCString());
    }
  }, [dateValue]);

  return (
    <InputGroup {...props}>
      <Input
        placeholder={placeholder}
        value={date}
        className="w-full"
        readOnly
      />
      <InputRightElement className="px-2">
        <HStack>
          {date && date.length > 0 ? (
            <MdClose className="cursor-pointer" onClick={() => setDate("")} />
          ) : null}
          <Menu {...menuProps?.menuProps}>
            <MenuButton {...menuProps?.menuButtonProps}>
              <BiCalendarEdit className="text-xl" />
            </MenuButton>
            <MenuList {...menuProps?.menuListProps}>
              <DateInput
                value={[date]}
                onDaySelect={(date) => {
                  setDate(date);
                  onDateChange && onDateChange(date);
                }}
              />
            </MenuList>
          </Menu>
        </HStack>
      </InputRightElement>
    </InputGroup>
  );
};
