"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import Autocomplete from "react-autocomplete";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { X } from "lucide-react";
import {
  LocationSearchInput,
  ServicesRequestKeys,
  SpinnerFallback,
  useGetPopularServiceLocationsQuery,
  useSearchFilters,
} from "@UI";
import { useOutsideClick, usePagination } from "hooks";
import { Location } from "api";
import { useRouting } from "routing";

interface SearchBarProps {
  placeholder1?: string;
  placeholder2?: string;
}

export default function SearchBarByLocationAndArea({
  placeholder1 = "Location",
  placeholder2 = "Cuisine, restaurant name...",
}: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const { visit } = useRouting();

  return (
    <div className="flex justify-center w-full px-4 pb-4 relative">
      <div className="flex w-full max-w-2xl rounded-md border border-gray-300 ">
        {/* Location Input */}
          <div className="flex-1 relative w-full">
          <LocationInput
            placeholder={placeholder1}
            onLocationSelect={(locationSlug) => {
              visit((routes) =>
                routes.visitServiceLocationSearchResults(
                  ServicesRequestKeys.beauty_center,
                  locationSlug
                )
              );
            }}
          />
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300"></div>

        {/* Search Input */}
        <div className="flex items-center px-4 flex-1 bg-white">
          <FiSearch className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder2}
            className="w-full py-3 text-sm text-gray-500 placeholder-gray-400 bg-white border-none outline-none"
          />
        </div>
      </div>
    </div>
  );
}



interface LocationInputProps {
  placeholder?: string;
  onLocationSelect: (locationSlug: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  placeholder = "Location",
  onLocationSelect,
}) => {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [focused, setFocused] = useState(false);

  const { filters } = useSearchFilters();
  const { page, take } = usePagination();
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setFocused(false));

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
    if (!location.trim()) setFilteredLocations(locations);
    else
      setFilteredLocations(
        locations.filter(
          (l) =>
            l.address.toLowerCase().includes(location.toLowerCase()) ||
            l.city.toLowerCase().includes(location.toLowerCase())
        )
      );
  }, [location, locations]);
console.log("Filtered locations:", filteredLocations);

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center flex-1 bg-white rounded-lg border border-gray-200 px-4">
        <FiMapPin className="text-gray-400 mr-2" size={18} />

        <Autocomplete
          getItemValue={(item) => item.address}
          items={filteredLocations}
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setFocused(true);
          }}
          onSelect={(val) => {
            setLocation(val);
            onLocationSelect(val);
            setFocused(false);
          }}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.address}
              style={{
                background: isHighlighted ? "#f3f4f6" : "white",
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div className="flex items-center gap-2 text-black">
                <HiOutlineLocationMarker className="text-gray-600 text-lg" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.address}</span>
                  <span className="text-xs text-gray-500">{item.city}</span>
                </div>
              </div>
            </div>
          )}
          inputProps={{
            placeholder,
            onFocus: () => setFocused(true),
            className:
              "w-full py-3 text-sm text-gray-500 placeholder-gray-400 bg-white border-none outline-none",
          }}
          menuStyle={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            zIndex: 1000,
            maxHeight: "240px",
            overflowY: "auto",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />

        {location && (
          <X
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => setLocation("")}
          />
        )}
      </div>

      {/* Inline loading / no results inside Autocomplete */}
      
        <div className="absolute top-full left-0 w-full z-50">
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {filteredLocations.length === 0 && !isLoading && (
              <div className="p-2 text-sm text-gray-400 bg-white border border-t-0 border-gray-200 rounded-b-lg">
                No results found
              </div>
            )}
          </SpinnerFallback>
        </div>
      
    </div>
  );
};
