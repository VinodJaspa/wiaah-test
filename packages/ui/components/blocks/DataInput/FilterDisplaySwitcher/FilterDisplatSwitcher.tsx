import { FilterDisplayType } from "api";
import React from "react";
import { Rate } from "../../../partials";

export interface FilterDisplatSwitcherProps {
  type: FilterDisplayType;
  value: any;
  label?: string;
}

export const FilterDisplaySwitcher: React.FC<FilterDisplatSwitcherProps> = ({
  type,
  value,
  label,
}) => {
  switch (type) {
    case "rate":
      return <Rate rating={parseInt(value)} />;
    case "text":
      return <>{label}</>;
    default:
      return null;
  }
};
