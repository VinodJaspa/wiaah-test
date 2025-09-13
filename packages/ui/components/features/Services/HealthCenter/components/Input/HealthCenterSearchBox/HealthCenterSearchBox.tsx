import React from "react";
import { useTranslation } from "react-i18next";
import { SpinnerFallback } from "ui";
import { HealthCenterPractitioner, HealthCenterSpecialty } from "api";
import { usePagination } from "hooks";
import { useRouting } from "routing";
import { setTestid } from "utils";
import { MapPinIcon, SearchIcon } from "lucide-react";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import { ServicesRequestKeys } from "@features/Services/constants";
import {
  useGetHealthCenterSearchSuggestionsQuery,
  SearchHealthSpecialtiesCardsList,
  SearchHealthPractitionersCardsList,
} from "@features/Services/HealthCenter";
console.log(ServicesRequestKeys,);

export const HealthCenterSearchBox: React.FC = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { page, take } = usePagination();

  const [search, setSearch] = React.useState({ q: "", location: "" });
  const [specialties, setSpecialties] = React.useState<HealthCenterSpecialty[]>([]);
  const [practitioners, setPractitioners] = React.useState<HealthCenterPractitioner[]>([]);
  const [isFocused, setIsFocused] = React.useState(false);

  // ✅ FIX: Pass `search` inside query params
  const { data: res, isLoading, isError } =
  useGetHealthCenterSearchSuggestionsQuery(
    { page, take },          // ✅ pagination
    search                   // ✅ filters (your { q, location })
  );


  React.useEffect(() => {
    if (res) {
      try {
        const { practitioners, specialties } = res.data;
        if (Array.isArray(specialties)) setSpecialties(specialties);
        if (Array.isArray(practitioners)) setPractitioners(practitioners);
      } catch {
        // ignore malformed data
      }
    }
  }, [res]);

  const handleSearch = () => {
    const result = visit((routes) =>
      routes
        .visitServiceLocationSearchResults(
          ServicesRequestKeys.healthCenter,
          search.location || "milano"
        )
        .addQuery(search)
    );
    console.log("Visit result:", result);
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      className="w-full flex flex-col gap-3"
      tabIndex={-1}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      {/* Search Row */}
      <div className="flex w-auto border border-gray-300 rounded-lg mb-2 overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
        {/* Location Input */}
        <div className="relative flex-1">
          <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            {...setTestid("SearchLocationInput")}
            type="text"
            placeholder={t("search.where", "Location")}
            value={search.location}
            onChange={(e) => setSearch((s) => ({ ...s, location: e.target.value }))}
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-10 pr-3 border-none focus:outline-none placeholder-gray-400"
          />
        </div>

        {/* Query Input */}
        <div className="relative flex-1 border-l border-gray-300">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            {...setTestid("SearchQueryInput")}
            type="text"
            placeholder={t(
              "search.healthCenterPlaceholder",
              "Health center, specialty, specialist"
            )}
            value={search.q}
            onChange={(e) => setSearch((s) => ({ ...s, q: e.target.value }))}
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-10 pr-3 border-none focus:outline-none placeholder-gray-400"
          />
        </div>

        {/* Find Button */}
        <PrimaryButton
          onClick={handleSearch}
          className="uppercase px-6 h-12 rounded-none"
        >
          {t("search.find", "Find")}
        </PrimaryButton>
      </div>

      {/* Suggestions */}
      {isFocused && (search.q || search.location) && (
        <div className="relative">
          <div className="flex bg-white rounded mt-2 shadow-md max-h-96 overflow-y-auto border border-gray-200">
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              <SearchHealthSpecialtiesCardsList
                searchQuery={search.q}
                specialites={specialties}
              />
              <SearchHealthPractitionersCardsList
                practitioners={practitioners}
                searchQuery={search.q}
              />
            </SpinnerFallback>
          </div>
        </div>
      )}
    </div>
  );
};
