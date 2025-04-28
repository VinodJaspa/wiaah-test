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
  SpinnerFallback,
  ServicesRequestKeys,
} from "@UI";
import { useGetHealthCenterSearchSuggestionsQuery } from "@UI";
import { SearchHealthSpecialtiesCardsList } from "@UI";
import { SearchHealthPractitionersCardsList } from "@UI";
import { usePagination } from "hooks";
import { useRouting } from "routing";
import { setTestid } from "utils";

export interface HealthCenterSearchBoxProps {}

export const HealthCenterSearchBox: React.FC<
  HealthCenterSearchBoxProps
> = () => {
  const { visit } = useRouting();
  const { page, take } = usePagination();
  const [search, setSearch] = React.useState<{
    q: string;
    location: string;
  }>({
    location: "",
    q: "",
  });
  const [specialites, setSepcialties] = React.useState<HealthCenterSpecialty[]>(
    [],
  );
  const [practitioners, setPractitioners] = React.useState<
    HealthCenterPractitioner[]
  >([]);

  const {
    data: res,
    isLoading,
    isError,
  } = useGetHealthCenterSearchSuggestionsQuery({ page, take }, search);

  React.useEffect(() => {
    if (res)
      try {
        const { practitioners, specialties } = res.data;
        if (Array.isArray(specialites)) setSepcialties(specialties);
        if (Array.isArray(practitioners)) setPractitioners(practitioners);
      } catch {}
  }, [res]);

const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <InputGroup className="w-full">
      <InputLeftElement>
        <SearchIcon className="text-primary" />
      </InputLeftElement>
      <Input
        {...setTestid("SearchQueryInput")}
        placeholder={t("health center")}
        onChange={(e) =>
          setSearch((state) => ({ ...state, q: e.target.value }))
        }
      />
      <InputRightElement className="w-full">
        <InputGroup className="border-y-0 border-r-0">
          <InputLeftElement className="flex justify-center items-center">
            <LocationOutlineIcon />
          </InputLeftElement>
          <Input
            {...setTestid("SearchLocationInput")}
            onChange={(e) =>
              setSearch((state) => ({ ...state, location: e.target.value }))
            }
            placeholder={t("where") + "?"}
          />
          <InputRightElement>
            <Button
              onClick={() =>
                visit((routes) =>
                  routes
                    .visitServiceLocationSearchResults(
                      ServicesRequestKeys.healthCenter,
                      "milano",
                    )
                    .addQuery(search),
                )
              }
              className="uppercase rounded-none px-12"
            >
              {t("find")}
            </Button>
          </InputRightElement>
        </InputGroup>
      </InputRightElement>
      <InputSuggestions className="overflow-x-hidden">
        <div className="flex bg-white rounded mt-2">
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            <SearchHealthSpecialtiesCardsList
              searchQuery={search.q || ""}
              specialites={specialites}
            />
            <SearchHealthPractitionersCardsList
              practitioners={practitioners}
              searchQuery={search.q || ""}
            />
          </SpinnerFallback>
        </div>
      </InputSuggestions>
    </InputGroup>
  );
};
