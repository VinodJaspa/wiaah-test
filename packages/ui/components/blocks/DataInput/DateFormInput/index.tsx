import {
  DateInput,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  HStack,
} from "ui";
import React from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { MdClose } from "react-icons/md";

export interface DateFormInputProps {
  placeholder?: string;
}

export const DateFormInput: React.FC<DateFormInputProps> = ({
  placeholder,
}) => {
  const [date, setDate] = React.useState<string>("");
  return (
    <InputGroup>
      <Input
        placeholder={placeholder}
        value={date}
        className="w-full"
        readOnly
      />
      <InputRightElement>
        <HStack>
          {date && date.length > 0 ? (
            <MdClose className="cursor-pointer" onClick={() => setDate("")} />
          ) : null}
          <Menu>
            <MenuButton>
              <BiCalendarEdit />
            </MenuButton>
            <MenuList>
              <DateInput onDaySelect={(date) => setDate(date)} />
            </MenuList>
          </Menu>
        </HStack>
      </InputRightElement>
    </InputGroup>
  );
};
