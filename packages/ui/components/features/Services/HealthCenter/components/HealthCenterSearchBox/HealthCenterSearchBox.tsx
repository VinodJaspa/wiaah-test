import { HealthCenterPractitioner, HealthCenterSpecialty } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  InputSuggestions,
  SearchIcon,
  Button,
  LocationOutlineIcon,
  useSearchFilters,
  SpinnerFallback,
  filtersTokens,
} from "ui";
import { debounce } from "utils";
import { useGetHealthCenterSearchSuggestionsQuery } from "ui";
import { SearchHealthSpecialtiesCardsList } from "../Lists";
import { SearchHealthPractitionersCardsList } from "../Lists/SearchHealthPractitionersCardsList";
import { usePagination } from "hooks";

export interface HealthCenterSearchBoxProps {}

export const HealthCenterSearchBox: React.FC<
  HealthCenterSearchBoxProps
> = () => {
  const { page, take } = usePagination();
  const { filters, addFilter, getFiltersSearchQuery } = useSearchFilters();
  const [specialites, setSepcialties] = React.useState<HealthCenterSpecialty[]>(
    []
  );
  const [practitioners, setPractitioners] = React.useState<
    HealthCenterPractitioner[]
  >([]);

  const { isLoading, isError, refetch } =
    useGetHealthCenterSearchSuggestionsQuery({ page, take }, filters, {
      onSuccess: (res) => {
        try {
          const { practitioners, specialties } = res.data;
          if (Array.isArray(specialites)) setSepcialties(specialties);
          if (Array.isArray(practitioners)) setPractitioners(practitioners);
        } catch {}
      },
    });
  // const deboundedRefetch = debounce(() => {
  //   console.log("refetching");
  //   refetch();
  // }, 1000);

  // React.useEffect(() => {
  //   console.log(filters, "filters");
  //   deboundedRefetch();
  // }, [filters]);

  const { t } = useTranslation();
  return (
    <InputGroup className="w-full">
      <InputLeftElement>
        <SearchIcon className="text-primary" />
      </InputLeftElement>
      <Input
        onChange={(e) => addFilter([filtersTokens.searchQuery, e.target.value])}
      />
      <InputRightElement className="w-full">
        <InputGroup className="border-y-0 border-r-0">
          <InputLeftElement className="flex justify-center items-center">
            <LocationOutlineIcon />
          </InputLeftElement>
          <Input
            onChange={(e) => addFilter([filtersTokens.where, e.target.value])}
            placeholder={t("where") + "?"}
          />
          <InputRightElement>
            <Button className="uppercase rounded-none px-12">
              {t("find")}
            </Button>
          </InputRightElement>
        </InputGroup>
      </InputRightElement>
      <InputSuggestions className="overflow-x-hidden">
        <div className="flex bg-white rounded mt-2">
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            <SearchHealthSpecialtiesCardsList
              searchQuery={getFiltersSearchQuery || ""}
              specialites={specialites}
            />
            <SearchHealthPractitionersCardsList
              practitioners={practitioners}
              searchQuery={getFiltersSearchQuery || ""}
            />
          </SpinnerFallback>
        </div>
      </InputSuggestions>
    </InputGroup>
  );
};
