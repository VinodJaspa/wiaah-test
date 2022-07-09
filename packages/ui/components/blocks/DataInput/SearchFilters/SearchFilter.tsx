import { SearchFilterType } from "api";
import React from "react";
import {
  DropdownPanel,
  FilterInput,
  Select,
  SelectOption,
} from "../../../partials";
import { FilterDisplaySwitcher } from "../FilterDisplaySwitcher";

export interface SearchFilterProps {
  filters: SearchFilterType[];
  onRangeChange?: (
    filterSlug: string,
    range: { min: number; max: number }
  ) => any;
  onOptionSelect?: (filterSlug: string, optionSlug: string) => any;
  onOptionsSelect?: (filterSlug: string, optionsSlugs: string[]) => any;
  defaultOpen?: boolean;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  filters,
  onRangeChange,
  onOptionSelect,
  onOptionsSelect,
  defaultOpen = false,
}) => {
  return (
    <>
      {filters.map((filter, i) => {
        switch (filter.filterType) {
          case "range":
            return (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>
                <FilterInput
                  variant="range"
                  min={filter.minRange}
                  max={filter.maxRange}
                  onRangeChange={(range) =>
                    onRangeChange && onRangeChange(filter.filterSlug, range)
                  }
                />
              </DropdownPanel>
            );
          case "select":
            return (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>
                <Select
                  onOptionSelect={(opt) =>
                    onOptionSelect && onOptionSelect(filter.filterSlug, opt)
                  }
                >
                  {Array.isArray(filter.filterOptions)
                    ? filter.filterOptions.map(({ optName, optSlug }, i) => (
                        <SelectOption value={optSlug}>
                          <FilterDisplaySwitcher
                            type={filter.filterDisplay}
                            value={optSlug}
                            label={optName}
                          />
                        </SelectOption>
                      ))
                    : null}
                </Select>
              </DropdownPanel>
            );
          case "radio":
            return (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>
                <div className="flex flex-col gap-2">
                  {Array.isArray(filter.filterOptions)
                    ? filter.filterOptions.map(({ optName, optSlug }, i) => (
                        <FilterInput
                          onChange={(e) =>
                            console.log(e.target.checked, optSlug)
                          }
                          name={filter.filterSlug}
                          label={
                            <FilterDisplaySwitcher
                              type={filter.filterDisplay}
                              value={optSlug}
                              label={optName}
                            />
                          }
                          variant="radio"
                        />
                      ))
                    : null}
                </div>
              </DropdownPanel>
            );

          case "check":
            return (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>
                <div className="flex flex-col gap-2">
                  {Array.isArray(filter.filterOptions)
                    ? filter.filterOptions.map(({ optName, optSlug }, i) => (
                        <FilterInput
                          onChange={(e) =>
                            console.log(e.target.checked, optSlug)
                          }
                          name={filter.filterSlug}
                          label={
                            <FilterDisplaySwitcher
                              type={filter.filterDisplay}
                              value={optSlug}
                              label={optName}
                            />
                          }
                          variant="box"
                        />
                      ))
                    : null}
                </div>
              </DropdownPanel>
            );
          default:
            break;
        }
      })}
    </>
  );
};
