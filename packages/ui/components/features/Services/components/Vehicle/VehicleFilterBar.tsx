"use client";
import { useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";

export default function VehicleFilterBar() {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white shadow rounded-lg mb-6">
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
        <MapPin size={18} /> Gevena
      </button>
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
