import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from "react-autocomplete";
import { Search, X } from "lucide-react";
import {
  Prefix,
  SpinnerFallback,
  useGetPopularServiceLocationsQuery,
  useSearchFilters,
} from "@UI";
import { Location } from "api";
import { useOutsideClick, usePagination } from "hooks";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiSend } from "react-icons/bi";

export interface LocationSearchInputProps {
  className?: string;
  onLocationSelect: (locationSlug: string) => any;
}

export const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  className,
  onLocationSelect,
}) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<string>("");
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const { filters } = useSearchFilters();
  const { take, page } = usePagination();
  const [focused, setFocused] = React.useState<boolean>(false);

  const { data, isLoading, isError } = useGetPopularServiceLocationsQuery(
    { page, take },
    filters,
    location,
    {
      onSuccess: (data) => {
        setLocations(data);
        setFilteredLocations(data);
      },
    }
  );

  useEffect(() => {
    if (location.trim() === "") {
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(
        locations.filter(
          (l) =>
            l.address.toLowerCase().includes(location.toLowerCase()) ||
            l.city.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
  }, [location, locations]);

  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setFocused(false));

  return (
    <div ref={ref} className={`relative w-full ${className || ""}`}>
      <Autocomplete
        getItemValue={(item) => item.address}
        items={filteredLocations}
        renderItem={(item, isHighlighted) => (
          <div
            key={item.address}
            style={{
              background: isHighlighted ? "#f3f4f6" : "white",
              padding: "8px 12px",
              cursor: "pointer",
              zIndex: 9999,
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div className="flex items-center gap-2 text-black">
              <span className="border-2 border-gray-200 p-2 rounded-full">
                <HiOutlineLocationMarker className="text-lg text-gray-600" />
              </span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{item.address}</span>
                <span className="text-xs text-gray-500">{item.city}</span>
              </div>
            </div>
          </div>
        )}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onSelect={(val) => {
          setLocation(val);
          onLocationSelect(val);
        }}
        inputProps={{
          placeholder: t("where to?"),
          className:
            "bg-gray-100 rounded-lg pl-12 pr-10 py-3 w-full text-sm font-medium outline-none",
        }}
        menuStyle={{
          borderRadius: "6px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          background: "white",
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 1000,
          maxHeight: "240px",
          overflowY: "auto",
        }}
      />

      {/* Search Icon */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      {/* Clear Icon */}
      {location && (
        <X
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => setLocation("")}
        />
      )}

      {/* Extra section shown only when focused */}
      {focused && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-md mt-1 z-50 p-3">
          <Prefix
            PrefixClassName="text-xl"
            className="items-center mb-2"
            Prefix={
              <span className="border-2 border-gray-200 p-2 rounded-full">
                <BiSend className="text-lg" />
              </span>
            }
          >
            <span className="font-semibold text-sm">{t("Nearby")}</span>
          </Prefix>
          <p className="uppercase font-semibold text-xs text-gray-500 mb-2">
            {t("Popular")} {t("Locations")}
          </p>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {filteredLocations.length === 0 && (
              <p className="text-xs text-gray-400">{t("No results found")}</p>
            )}
          </SpinnerFallback>
        </div>
      )}
    </div>
  );
};
