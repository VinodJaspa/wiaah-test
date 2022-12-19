import { SearchFilterType } from "api";
import { debounce, throttle } from "lodash";
import React from "react";
import { FilterAndAddToArray } from "utils";
import {
  DropdownPanel,
  FilterInput,
  Select,
  SelectOption,
  SpinnerFallback,
  FilterDisplaySwitcher,
  SpinnerFallbackProps,
} from "@UI";

export interface SearchFilterProps {
  filters: SearchFilterType[];
  onRangeChange?: (
    filterSlug: string,
    range: { min: number; max: number }
  ) => any;
  onOptionSelect?: (filterSlug: string, optionSlug: string) => any;
  onOptionsSelect?: (filterSlug: string, optionsSlugs: string[]) => any;
  defaultOpen?: boolean;
  collapse?: boolean;
  boldTitle?: boolean;
}

export const SearchFilter: React.FC<
  SearchFilterProps & { fallbackProps?: SpinnerFallbackProps }
> = ({
  filters,
  onRangeChange,
  onOptionSelect,
  onOptionsSelect,
  defaultOpen = false,
  collapse,
  fallbackProps,
  boldTitle,
}) => {
  return (
    <SpinnerFallback {...fallbackProps}>
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
            const input = (
              <div className="flex flex-col gap-2">
                {!collapse ? (
                  <span className="py-1 font-semibold">
                    {filter.filterTitle}
                  </span>
                ) : null}
                <FilterInput
                  variant="range"
                  min={filter.minRange}
                  max={filter.maxRange}
                  onRangeChange={handleRangeChange}
                />
              </div>
            );
            return collapse ? (
              <DropdownPanel
                className="min-w-[15rem]"
                open={defaultOpen}
                name={filter.filterTitle}
                children={input}
              />
            ) : (
              input
            );

          case "select":
            const select = (
              <Select
                placeholder={!collapse ? filter.filterTitle : undefined}
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
            );
            return collapse ? (
              <DropdownPanel
                open={defaultOpen}
                name={filter.filterTitle}
                children={select}
              />
            ) : (
              select
            );

          case "radio":
            const radio = (
              <div className="flex flex-col gap-2">
                {!collapse ? (
                  <span
                    className={`${
                      boldTitle ? "font-bold" : "font-semibold"
                    } py-1`}
                  >
                    {filter.filterTitle}
                  </span>
                ) : null}
                {Array.isArray(filter.filterOptions)
                  ? filter.filterOptions.map(({ optName, optSlug }, i) => (
                      <FilterInput
                        onChange={(e) => console.log(e.target.checked, optSlug)}
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
            );
            return collapse ? (
              <DropdownPanel
                open={defaultOpen}
                name={filter.filterTitle}
                children={radio}
              />
            ) : (
              radio
            );

          case "check":
            const check = (
              <div className="flex flex-col gap-2">
                {!collapse ? (
                  <span className="py-1 font-semibold">
                    {filter.filterTitle}
                  </span>
                ) : null}
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
            );
            return collapse ? (
              <DropdownPanel
                open={defaultOpen}
                name={filter.filterTitle}
                children={check}
              />
            ) : (
              check
            );
          default:
            break;
        }
      })}
    </SpinnerFallback>
  );
};
