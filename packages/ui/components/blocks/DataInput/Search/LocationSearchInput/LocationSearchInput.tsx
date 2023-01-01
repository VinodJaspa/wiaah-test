import React from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  InputGroup,
  Input,
  InputLeftElement,
  SearchIcon,
  Prefix,
  AddIcon,
  useGetPopularServiceLocationsQuery,
  SpinnerFallback,
  useSearchFilters,
} from "@UI";
import { BiSend } from "react-icons/bi";
import { Location } from "api";
import { useOutsideClick, usePagination } from "hooks";

export interface LocationSearchInputProps {
  className?: string;
  onLocationSelect: (locationSlug: string) => any;
}

export const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  className,
  onLocationSelect,
}) => {
  const [focused, setFocused] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [locations, setLocations] = React.useState<Location[]>();
  const { t } = useTranslation();
  const { filters } = useSearchFilters();
  const { take, page } = usePagination();
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useGetPopularServiceLocationsQuery(
    { page, take },
    filters,
    search,
    {
      onSuccess: (data) => {
        setLocations(data);
      },
    }
  );
  useOutsideClick(ref, () => setFocused(false));

  return (
    <div
      ref={ref}
      className={`${
        className || ""
      } rounded-lg relative z-10 isolate w-full border-[1px] border-gray-200 border-b-0 p-2`}
    >
      <InputGroup flushed className="border-b-black ">
        <InputLeftElement className="flex px-2 justify-center items-center">
          <SearchIcon />
        </InputLeftElement>

        <Input
          onFocus={() => setFocused(true)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("where to?")}
          className="py-2 w-full"
        />
      </InputGroup>
      <div
        className={`${
          focused ? "" : " scale-y-0 opacity-0 pointer-events-none"
        } origin-top transition-all bg-white left-0 w-full border-[1px] border-t-0 border-gray-200 absolute flex flex-col gap-4 p-4 z-20`}
      >
        <Prefix
          PrefixClassName="text-2xl"
          className="items-center"
          Prefix={() => (
            <span className="border-2 border-gray-200 p-2 rounded-full">
              <BiSend className="text-xl" />
            </span>
          )}
        >
          <span className="font-bold text-sm">{t("Nearby")}</span>
        </Prefix>
        <p className="uppercase font-bold">
          {t("Popular")} {t("Locations")}
        </p>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {Array.isArray(locations)
            ? locations.map((location, i) => (
                <Prefix
                  key={i}
                  onClick={() => {
                    onLocationSelect(location.address);
                    setFocused(false);
                  }}
                  className="hover:bg-gray-100 active:bg-gray-200 border-b-2 border-gray-200 py-2 cursor-pointer"
                  Prefix={() => (
                    <span className="border-2 border-gray-200 p-2 rounded-full">
                      <HiOutlineLocationMarker className="text-xl" />
                    </span>
                  )}
                >
                  <div className="flex flex-col text-black">
                    <span className="font-bold">{location.address}</span>
                    <span>{location.city}</span>
                  </div>
                </Prefix>
              ))
            : null}
        </SpinnerFallback>
      </div>
    </div>
  );
};
