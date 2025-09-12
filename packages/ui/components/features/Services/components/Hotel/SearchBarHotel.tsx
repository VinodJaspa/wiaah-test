"use client";

import { LocationSearchInput } from "@blocks";
import { ServicesRequestKeys } from "@features/Services/constants";
import { format } from "date-fns";
import { Calendar, ChevronDown, Search, Users, X } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouting } from "routing";

const locations = ["Geneva", "Paris", "London", "New York", "Tokyo", "Dubai", "Sydney"];

export default function SearchBarHotel() {

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [editingGuests, setEditingGuests] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { visit } = useRouting();
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const GuestSelector = () => (
    <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Adults</span>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
          <span>{adults}</span>
          <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setAdults(adults + 1)}>+</button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Children</span>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
          <span>{children}</span>
          <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setChildren(children + 1)}>+</button>
        </div>
      </div>
    </div>
  );

  const formatDateRange = (range: [Date | null, Date | null]) => {
    if (!range[0] && !range[1]) return "";
    if (range[0] && !range[1]) return format(range[0], "MMM d");
    if (range[0] && range[1]) return `${format(range[0], "MMM d")} to ${format(range[1], "MMM d")}`;
    return "";
  };

  const SearchInputs = () => (
    <div className="flex flex-col md:flex-row gap-4 ">
      {/* Location */}
      <div className="flex-1 relative w-full">

        <LocationSearchInput onLocationSelect={(location) => {
          visit((routes) =>
            routes.visitServiceLocationSearchResults(
              ServicesRequestKeys.hotels,
              location,
            ),
          );
        }} />
      </div>

      {/* Dates */}
      <div className="flex-1 relative w-full">
        <DatePicker
          selected={dateRange[0]}
          onChange={(dates: [Date | null, Date | null]) => setDateRange(dates)}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          selectsRange
          placeholderText="Check-in - Check-out"
          className="bg-gray-100 rounded-lg pl-12 py-3 w-full text-sm font-medium cursor-pointer"
          value={formatDateRange(dateRange)}
        />
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      </div>

      {/* Guests */}
      <div className="flex-1 relative">
        <div
          className="flex items-center justify-between gap-2 bg-gray-100 px-4 py-3 rounded-lg cursor-pointer"
          onClick={() => setEditingGuests(!editingGuests)}
        >
          <Users size={18} className="text-gray-500" />
          <span className="text-gray-800 text-sm font-medium">
            {adults} Adults, {children} Children
          </span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        {editingGuests && <GuestSelector />}
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      {/* Mobile search icon */}
      <div className="md:hidden flex justify-center p-4">
        <button
          className="flex items-center gap-2 bg-white shadow-md rounded-full px-6 py-3 w-58 justify-center"
          onClick={() => setMobileOpen(true)}
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex w-full justify-center p-6 mb-6">
        <SearchInputs />
      </div>

      {/* Mobile Modal */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-24 px-4">
          <div className="bg-white w-full rounded-xl p-6 space-y-4 relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>

            <SearchInputs />

            <button
              className="w-full bg-primary text-white py-3 rounded-lg mt-4 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
