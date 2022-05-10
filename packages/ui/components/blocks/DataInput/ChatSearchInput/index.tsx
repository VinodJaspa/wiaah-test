import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import React from "react";
import { useTranslation } from "react-i18next";

export interface ChatSearchInputProps {
  innerProps?: BoxProps;
}

export const ChatSearchInput: React.FC<ChatSearchInputProps> = ({
  innerProps,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { t } = useTranslation();

  return (
    <Box {...innerProps}>
      <InputGroup>
        <InputLeftElement>
          <Icon fontSize={"0.85em"} color="gray" as={FiSearch} />
        </InputLeftElement>
        <Input
          rounded={"lg"}
          placeholder={t("search", "Search")}
          value={searchValue}
          bgColor="lightGray"
          border={"none"}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>
    </Box>
  );
};
