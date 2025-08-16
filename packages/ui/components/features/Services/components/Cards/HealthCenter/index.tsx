// app/doctors/page.tsx
"use client";

import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import { DoctorCard } from "./DoctorCard";
import { useState } from "react";



const doctors = [
  {
    name: "Dr. Anya Sharma",
    specialty: "Dentist",
    address: "1208, Geneva",
    image: "/images/anya.png",
  },
  {
    name: "Dr. Ben Carter",
    specialty: "Cardiologist",
    address: "1208, Geneva",
    image: "/images/carter.png",
  },
  {
    name: "Dr. Chloe Dubois",
    specialty: "Dermatologist",
    address: "1208, Geneva",
    image: "/images/chloe.png",
  },
  {
    name: "Kings Medical Cabinet",
    specialty: "Orthopedist",
    address: "1208, Geneva",
    image: "/images/kings.png",
  },
];

export default function DoctorsPage() {
    const [total, setTotal] = useState(5);
    const [current , setCurrent] = useState(1);
    const handleNext =()=>{
        
    }
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* 🔍 Search Bar */}
      <div className="flex items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Location"
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <input
          type="text"
          placeholder="Health center, specialty, specialist"
          className="flex-[2] border rounded-lg px-4 py-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>

      {/* 👨‍⚕️ Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Array(4) // repeat 4 rows like your screenshot
          .fill(null)
          .map((_, rowIndex) =>
            doctors.map((doc, i) => (
              <DoctorCard key={`${rowIndex}-${i}`} {...doc} />
            ))
          )}
          <Pagination total={total} current={current} onPageChange={handleNext}/>
      </div>
    </div>
  );
}
