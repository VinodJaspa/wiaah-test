import React from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  InputGroup,
  InputRightElement,
  InputGroupProps,
  SearchIcon,
} from "@UI";

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
      } rounded-xl border-[0px] bg-lightGray p-0 w-[min(20rem,100%)]`}
    >
      <InputRightElement className="w-10 flex h-full justify-center items-center">
        <SearchIcon className="text-lightBlack text-icon" />
      </InputRightElement>
      <Input
        value={searchInputValue}
        onChange={(e) => handleSearchInputChange(e.target.value)}
        className="rounded-xl bg-transparent py-0 w-full"
        placeholder={t("Type to search") + "..."}
      />
    </InputGroup>
  );
};
