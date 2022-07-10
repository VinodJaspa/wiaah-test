import { SearchFilterType } from "api";
import { debounce, throttle } from "lodash";
import React from "react";
import { FilterAndAddToArray } from "utils";
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
        const [checkBoxs, setCheckBoxs] = React.useState<[string, string[]]>([
          filter.filterSlug,
          [],
        ]);

        React.useEffect(() => {
          if (onOptionsSelect && filter.filterType === "check") {
            onOptionsSelect(checkBoxs[0], checkBoxs[1]);
          }
        }, [checkBoxs]);

        const handleRangeChange = debounce(
          (args) => onRangeChange && onRangeChange(filter.filterSlug, args),
          1000
        );

        switch (filter.filterType) {
          case "range":
            return (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>
                <FilterInput
                  variant="range"
                  min={filter.minRange}
                  max={filter.maxRange}
                  onRangeChange={handleRangeChange}
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
                    ? filter.filterOptions.map(({ optName, optSlug }, i) => {
                        return (
                          <FilterInput
                            onChange={(e) =>
                              e.target.checked
                                ? setCheckBoxs((state) => {
                                    const values = FilterAndAddToArray<string>(
                                      state[1],
                                      optSlug,
                                      "exclude"
                                    );
                                    console.log("filtered and added", values);
                                    return [filter.filterSlug, values];
                                  })
                                : setCheckBoxs((state) => [
                                    filter.filterSlug,
                                    state[1].filter((f) => f !== optSlug),
                                  ])
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
                        );
                      })
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
