// app/doctors/page.tsx
"use client";

import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import { DoctorCard } from "./DoctorCard";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import SearchBarByLocationAndArea from "../Restaurant/SearchBarRestaurant";
import { Divider } from "@partials";
import { HealthCenterSearchBox } from "@features/Services/HealthCenter";

const doctors = [
  {
    id: "1",
    name: "Dr. Anya Sharma",
    specialty: "Dentist",
    address: "1208, Geneva",
    image: "/assets/doctor-4.png",
  },
  {
    id: "2",
    name: "Dr. Ben Carter",
    specialty: "Cardiologist",
    address: "21B, London",
    image: "/assets/doctor.png",
  },
  {
    id: "3",
    name: "Dr. Chloe Dubois",
    specialty: "Dermatologist",
    address: "Rue Saint-Michel, Paris",
    image: "/assets/ladies-doc.png",
  },
  {
    id: "4",
    name: "Kings Medical Cabinet",
    specialty: "Orthopedist",
    address: "Ringstrasse, Vienna",
    image: "/assets/man-doc.png",
  },
  {
    id: "5",
    name: "Dr. Fatima Noor",
    specialty: "Neurologist",
    address: "Khan Market, Delhi",
    image: "/assets/ladies-doc.png",
  },
  {
    id: "6",
    name: "Dr. Leo Martinez",
    specialty: "Pediatrician",
    address: "Plaza Mayor, Madrid",
    image: "/assets/doctor.png",
  },
  {
    id: "7",
    name: "Dr. Sarah Kim",
    specialty: "Gynecologist",
    address: "Gangnam, Seoul",
    image: "/assets/man-doc.png",
  },
  {
    id: "8",
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
    <div className="max-w-7xl mx-auto px-6 py-2 mb-4">
      {/* 🔍 Search Bar */}
      <HealthCenterSearchBox
       
      />

      <Divider />
      {/* 👨‍⚕️ Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
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
