import React from "react";
import { useTranslation } from "react-i18next";
import { MapPinIcon, SearchIcon } from "lucide-react";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import { ForkAndSpoonIcon } from "@partials";

export interface RestaurantSearchInputProps {
  onSubmit: (search: { q: string; location: string }) => void;
}

export const RestaurantSearchInput: React.FC<RestaurantSearchInputProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState({ q: "", location: "" });
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSearch = () => {
    onSubmit(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      className="flex flex-col gap-2 w-full"
      tabIndex={-1}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false);
      }}
    >
      {/* Search Row */}
      <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
        {/* Cuisine / Query */}
    

        {/* Location */}
        <div className="relative flex-1 border-r border-gray-300">
          <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("Where") + "..."}
            value={search.location}
            onChange={(e) => setSearch((s) => ({ ...s, location: e.target.value }))}
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-10 pr-3 border-none focus:outline-none placeholder-gray-400"
          />
        </div>
        <div className="relative flex-1">
          <ForkAndSpoonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("Cuisine, restaurant name") + "..."}
            value={search.q}
            onChange={(e) => setSearch((s) => ({ ...s, q: e.target.value }))}
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-10 pr-3 border-none focus:outline-none placeholder-gray-400"
          />
        </div>
        {/* Search Button */}
        <PrimaryButton
          onClick={handleSearch}
          className="uppercase px-6 h-12 rounded-none"
        >
          {t("Search")}
        </PrimaryButton>
      </div>

   
    </div>
  );
};
