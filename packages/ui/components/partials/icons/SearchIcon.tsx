import React from "react";
import { HiSearch } from "react-icons/hi";
import { HtmlDivProps } from "types";

export interface SearchIconProps extends HtmlDivProps {}

export const SearchIcon: React.FC<SearchIconProps> = ({
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <HiSearch />
    </div>
  );
};
