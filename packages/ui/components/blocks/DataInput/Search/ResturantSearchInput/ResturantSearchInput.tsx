import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlInputProps } from "types";
import {
  Button,
  ForkAndSpoonIcon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  LocationOutlineIcon,
} from "../../../../partials";

export interface ResturantSearchInputProps {
  whatInputProps?: HtmlInputProps;
  whereInputProps?: HtmlInputProps;
  onSubmit: () => any;
  children?: React.ReactNode;
}

export const ResturantSearchInput: React.FC<ResturantSearchInputProps> = ({
  onSubmit,
  children,
  whatInputProps,
  whereInputProps,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center">
      <InputGroup className="relative rounded-lg border-gray-400 w-full">
        <InputLeftElement className="px-2 text-gray-500">
          <ForkAndSpoonIcon />
        </InputLeftElement>
        <Input
          {...whatInputProps}
          placeholder={t("Cuisine, resturant name") + "..."}
          className="py-1 w-full"
        />
        <InputRightElement className="w-[min(35%,20rem)]">
          <InputGroup className="px-2 py-1 border-y-0 border-r-0 border-l-2 relative">
            <InputLeftElement>
              <LocationOutlineIcon />
            </InputLeftElement>
            <Input
              {...whereInputProps}
              placeholder={t("Where") + "..."}
              className="w-full"
            />
          </InputGroup>
        </InputRightElement>
      </InputGroup>
      <Button onClick={() => onSubmit()}>{t("Search")}</Button>
    </div>
  );
};
