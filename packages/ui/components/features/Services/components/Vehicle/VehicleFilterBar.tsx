"use client";
import { useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { LocationSearchInput } from "@blocks";
import { useRouting } from "routing";
import { ServicesRequestKeys } from "@features/Services/constants";

export default function VehicleFilterBar() {
  const { visit } = useRouting();
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white shadow rounded-lg mb-6 justify-center mx-auto">
      <div className="flex">         
        <LocationSearchInput onLocationSelect={(location) => {
        visit((routes) =>
          routes.visitServiceLocationSearchResults(
            ServicesRequestKeys.vehicle,
            location,
          ),
        );
      }} /></div>

      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
        <Calendar size={18} /> Pick-up
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
        <Clock size={18} /> Time
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
        <Calendar size={18} /> Drop-off
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
        <Clock size={18} /> Time
      </button>
    </div>
  );
}
