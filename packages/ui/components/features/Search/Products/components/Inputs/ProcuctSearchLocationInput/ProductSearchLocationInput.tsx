import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlInputProps } from "types";
import { PaperPlaneIcon, Input, InputGroup, InputLeftElement } from "@UI";

export interface ProductSearchLocationInputProps extends HtmlInputProps {}

export const ProductSearchLocationInput: React.FC<
  ProductSearchLocationInputProps
> = (props) => {
  const { t } = useTranslation();
  const ph = `${t("Location")}...`;
  return (
    <InputGroup
      className="border-[0px] rounded-xl"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.03",
      }}
    >
      <InputLeftElement>
        <PaperPlaneIcon className="text-xl text-primary" />
      </InputLeftElement>
      <Input
        {...props}
        placeholder={props ? props.placeholder || ph : ph}
        className="rounded-xl h-12 text-sm font-normal text-black placeholder:text-black placeholder:text-opacity-40"
      />
    </InputGroup>
  );
};
