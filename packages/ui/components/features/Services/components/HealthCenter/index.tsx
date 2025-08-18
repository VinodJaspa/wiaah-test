// app/doctors/page.tsx
"use client";

import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import { DoctorCard } from "./DoctorCard";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";

const doctors = [
  {
    name: "Dr. Anya Sharma",
    specialty: "Dentist",
    address: "1208, Geneva",
    image: "/assets/doctor-4.png",
  },
  {
    name: "Dr. Ben Carter",
    specialty: "Cardiologist",
    address: "21B, London",
    image: "/assets/doctor.png",
  },
  {
    name: "Dr. Chloe Dubois",
    specialty: "Dermatologist",
    address: "Rue Saint-Michel, Paris",
    image: "/assets/ladies-doc.png",
  },
  {
    name: "Kings Medical Cabinet",
    specialty: "Orthopedist",
    address: "Ringstrasse, Vienna",
    image: "/assets/man-doc.png",
  },
  {
    name: "Dr. Fatima Noor",
    specialty: "Neurologist",
    address: "Khan Market, Delhi",
    image: "/assets/ladies-doc.png",
  },
  {
    name: "Dr. Leo Martinez",
    specialty: "Pediatrician",
    address: "Plaza Mayor, Madrid",
    image: "/assets/doctor.png",
  },
  {
    name: "Dr. Sarah Kim",
    specialty: "Gynecologist",
    address: "Gangnam, Seoul",
    image: "/assets/man-doc.png",
  },
  {
    name: "Dr. Omar Farouk",
    specialty: "ENT Specialist",
    address: "Al-Souk, Cairo",
    image: "/assets/ladies-doc.png",
  },
];

export default function DoctorsPage() {
  const [total] = useState(10); // total pages
  const [current, setCurrent] = useState(1);

  const handleNext = (page: number) => {
    setCurrent(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* 🔍 Search Bar */}
      <div className="flex items-center w-full max-w-3xl mx-auto border rounded-lg overflow-hidden shadow-sm mb-10">
        {/* Location input */}
        <div className="flex items-center flex-1 px-3 py-2 border-r border-gray-300">
          <MapPin className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full text-sm placeholder-gray-400 border-none outline-none focus:outline-none focus:ring-0"
          />
        </div>

        {/* Divider */}
        <div className="w-[2px] h-full bg-gray-300" />


        {/* Specialty input */}
        <div className="flex items-center flex-[2] px-3 py-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Health center, specialty, specialist"
            className="w-full text-sm placeholder-gray-400 border-none outline-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>



      {/* 👨‍⚕️ Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {doctors.map((doc, i) => (
          <DoctorCard key={i} {...doc} />
        ))}
      </div>

      {/* 📄 Pagination (centered) */}
      <div className="flex justify-center mt-10">
        <Pagination total={total} current={current} onPageChange={handleNext} />
      </div>
    </div>
  );
}
