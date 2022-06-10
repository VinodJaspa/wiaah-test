import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { Input, InputGroup, InputRightElement, InputGroupProps } from "ui";

export interface SearchInputProps {
  innerProps?: InputGroupProps;
  onValueChange?: (value: string) => any;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  innerProps,
  onValueChange,
}) => {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");

  React.useEffect(() => {
    onValueChange && onValueChange(searchInputValue);
  }, [searchInputValue]);

  function handleSearchInputChange(value: string) {
    setSearchInputValue(value);
  }
  const { t } = useTranslation();
  return (
    <InputGroup {...innerProps} className="max-w-[30rem]">
      <InputRightElement className="w-10 border-l-[1px] flex h-full justify-center border-gray-300">
        <HiSearch className="text-gray-500 text-xl" />
      </InputRightElement>
      <Input
        value={searchInputValue}
        onChange={(e) => handleSearchInputChange(e.target.value)}
        className="rounded-full w-full"
        placeholder={t("search_on_wiaah", "search on wiaah")}
      />
    </InputGroup>
  );
};
