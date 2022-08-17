import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { Input, InputGroup, InputRightElement, InputGroupProps } from "ui";

export interface SearchInputProps {
  innerProps?: InputGroupProps;
  onValueChange?: (value: string) => any;
  value?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  innerProps,
  onValueChange,
  value,
}) => {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");

  React.useEffect(() => {
    onValueChange && onValueChange(searchInputValue);
  }, [searchInputValue]);

  React.useEffect(() => {
    if (value) {
      setSearchInputValue(value);
    }
  }, [value]);
  function handleSearchInputChange(value: string) {
    setSearchInputValue(value);
  }
  const { t } = useTranslation();
  return (
    <InputGroup
      {...innerProps}
      className={`${
        innerProps?.className || ""
      } rounded-xl p-0 w-[min(20rem,100%)]`}
    >
      <InputRightElement className="w-10 border-l-[1px] flex h-full justify-center items-center border-gray-300">
        <HiSearch className="text-gray-500 text-xl" />
      </InputRightElement>
      <Input
        value={searchInputValue}
        onChange={(e) => handleSearchInputChange(e.target.value)}
        className="rounded-xl py-0 w-full"
        placeholder={t("search on wiaah")}
      />
    </InputGroup>
  );
};
