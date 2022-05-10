import {
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
  BoxProps,
  InputGroupProps,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";

export interface SearchInputProps {
  style?: InputGroupProps;
}

export const SearchInput: React.FC<SearchInputProps> = ({ style }) => {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  function handleSearchInputChange(value: string) {
    setSearchInputValue(value);
  }
  const { t } = useTranslation();
  return (
    <Box {...style}>
      <InputGroup maxW={"30rem"}>
        <InputRightElement borderLeftWidth={"1px"}>
          <IconButton
            aria-label="Search Input Submit button"
            fill="gray"
            fontSize={"xl"}
            variant="noBg"
            icon={<HiSearch />}
          />
        </InputRightElement>
        <Input
          value={searchInputValue}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          rounded="full"
          pr="5rem"
          placeholder={t("search_on_wiaah", "search on wiaah")}
        />
      </InputGroup>
    </Box>
  );
};
