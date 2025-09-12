import { SearchFilterType } from "api";
import { debounce } from "lodash";
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
  onRangeChange?: (filterSlug: string, range: { min: number; max: number }) => void;
  onOptionSelect?: (filterSlug: string, optionSlug: string) => void;
  onOptionsSelect?: (filterSlug: string, optionsSlugs: string[]) => void;
  defaultOpen?: boolean;
  collapse?: boolean;
  boldTitle?: boolean;
  fallbackProps?: SpinnerFallbackProps;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  filters,
  onRangeChange,
  onOptionSelect,
  onOptionsSelect,
  defaultOpen = false,
  collapse,
  boldTitle,
  fallbackProps,
}) => {
  return (
    <SpinnerFallback {...fallbackProps}>
      {filters.map((filter) => {
        const [checkedOptions, setCheckedOptions] = React.useState<[string, string[]]>([
          filter.filterSlug,
          [],
        ]);

        React.useEffect(() => {
          if (onOptionsSelect && filter.filterType === "check") {
            onOptionsSelect(checkedOptions[0], checkedOptions[1]);
          }
        }, [checkedOptions]);

        const handleRangeChange = debounce(
          (range: { min: number; max: number }) => onRangeChange?.(filter.filterSlug, range),
          1000
        );

        const renderLabel = (label: React.ReactNode) => (
          !collapse && <span className={`${boldTitle ? "font-bold" : "font-semibold"} text-sm py-1`}>{label}</span>
        );

        switch (filter.filterType) {
          case "range":
            const rangeInput = (
              <div className="flex flex-col gap-1 text-sm">
                {renderLabel(filter.filterTitle)}
                <FilterInput
                  variant="range"
                  min={filter.minRange}
                  max={filter.maxRange}
                  onRangeChange={handleRangeChange}
                />
              </div>
            );
            return collapse ? (
              <DropdownPanel className="min-w-[15rem]" open={defaultOpen} name={filter.filterTitle}>
                {rangeInput}
              </DropdownPanel>
            ) : (
              rangeInput
            );

          case "select":
            const select = (
              <Select
                placeholder={!collapse ? filter.filterTitle : undefined}
                onOptionSelect={(opt) => onOptionSelect?.(filter.filterSlug, opt)}
              >
                {filter.filterOptions?.map(({ optName, optSlug }) => (
                  <SelectOption key={optSlug} value={optSlug}>
                    <FilterDisplaySwitcher type={filter.filterDisplay} value={optSlug} label={optName} />
                  </SelectOption>
                ))}
              </Select>
            );
            return collapse ? (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>{select}</DropdownPanel>
            ) : (
              select
            );

          case "radio":
            const radioInputs = (
              <div className="flex flex-col gap-1 text-sm">
                {renderLabel(filter.filterTitle)}
                {filter.filterOptions?.map(({ optName, optSlug }) => (
                  <FilterInput
                    key={optSlug}
                    variant="radio"
                    name={filter.filterSlug}
                    onChange={(e) => console.log(e.target.checked, optSlug)}
                    label={<FilterDisplaySwitcher type={filter.filterDisplay} value={optSlug} label={optName} />}
                  />
                ))}
              </div>
            );
            return collapse ? (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>{radioInputs}</DropdownPanel>
            ) : (
              radioInputs
            );

          case "check":
            const checkboxes = (
              <div className="flex flex-col gap-1 text-sm">
                {renderLabel(filter.filterTitle)}
                {filter.filterOptions?.map(({ optName, optSlug }) => (
                  <FilterInput
                    key={optSlug}
                    variant="box"
                    name={filter.filterSlug}
                    onChange={(e) =>
                      e.target.checked
                        ? setCheckedOptions((state) => [
                            filter.filterSlug,
                            FilterAndAddToArray(state[1], optSlug, "exclude"),
                          ])
                        : setCheckedOptions((state) => [
                            filter.filterSlug,
                            state[1].filter((f) => f !== optSlug),
                          ])
                    }
                    label={<FilterDisplaySwitcher type={filter.filterDisplay} value={optSlug} label={optName} />}
                  />
                ))}
              </div>
            );
            return collapse ? (
              <DropdownPanel open={defaultOpen} name={filter.filterTitle}>{checkboxes}</DropdownPanel>
            ) : (
              checkboxes
            );

          default:
            return null;
        }
      })}
    </SpinnerFallback>
  );
};
