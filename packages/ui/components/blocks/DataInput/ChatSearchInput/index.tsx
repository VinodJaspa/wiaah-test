import { FiSearch } from "react-icons/fi";
import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";
import { InputGroup, InputLeftElement, Input } from "@UI";

export interface ChatSearchInputProps extends HtmlDivProps {}

export const ChatSearchInput: React.FC<ChatSearchInputProps> = ({
  className,
  ...props
}) => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { t } = useTranslation();

  return (
    <div className={`${className || ""}`} {...props}>
      <InputGroup>
        <InputLeftElement>
          <FiSearch className="text-[0.85em] text-gray" />
        </InputLeftElement>
        <Input
          className="rounded-[0.5rem] border-[1px]"
          placeholder={t("search", "Search")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};
