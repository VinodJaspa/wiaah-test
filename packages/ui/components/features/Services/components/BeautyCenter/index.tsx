
"use client";

import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";

import { Divider } from "@partials";
import { useState } from "react";
import SearchBarByLocationAndArea from "../Restaurant/SearchBarRestaurant";
import BeautityCenterCard from "./beautyCenterCard";



export default function BeautyCenterPage() {
  const [total] = useState(10); // total pages
  const [current, setCurrent] = useState(1);

  const handleNext = (page: number) => {
    setCurrent(page);
  };
  const data = [
    {
      id: 1,
      name: "Barber King",
      location: "New York",
      image: "/assets/beaut-1.png"
,
      rating: 4.8,
      services: "Haircut, Beard Trim, Shaves",
      price: "$25",
      role: "Barber",
      duration: "30 min",
      address: "123 5th Ave, New York, NY",
      reviews: 120,
      key: 1,
    },
    {
      id: 2,
      name: "Elite Hair Studio",
      location: "Los Angeles",
        image: "/assets/beaut-2.png",
      rating: 4.6,
      services: "Hair Coloring, Styling, Hair Treatment",
      price: "$45",
      role: "Stylist",
      duration: "45 min",
      address: "456 Sunset Blvd, Los Angeles, CA",
      reviews: 95,
      key: 2,
    },
    {
      id: 3,
      name: "Gentlemen's Cut",
      location: "Chicago",
      image: "/assets/beaut-3.png",
      rating: 4.7,
      services: "Haircut, Beard Trim, Facial",
      price: "$30",
      role: "Barber",
      duration: "40 min",
      address: "789 Michigan Ave, Chicago, IL",
      reviews: 80,
      key: 3,
    },
    {
      id: 4,
      name: "Modern Barber",
      location: "San Francisco",
      image: "/assets/beaut-4.png",
      rating: 4.5,
      services: "Haircut, Beard Styling, Hot Towel Shave",
      price: "$35",
      role: "Barber",
      duration: "35 min",
      address: "101 Market St, San Francisco, CA",
      reviews: 110,
      key: 4,
    },
    {
      id: 5,
      name: "Classic Cuts",
      location: "Houston",
      image: "/assets/beaut-2.png",
      rating: 4.9,
      services: "Haircut, Beard Trim, Kids Haircut",
      price: "$28",
      role: "Barber",
      duration: "30 min",
      address: "202 Main St, Houston, TX",
      reviews: 140,
      key: 5,
    },
    {
      id: 6,
      name: "The Grooming Lounge",
      location: "Miami",
      image: "/assets/beaut-4.png",
      rating: 4.7,
      services: "Haircut, Hair Spa, Facial",
      price: "$50",
      role: "Stylist",
      duration: "50 min",
      address: "303 Ocean Dr, Miami, FL",
      reviews: 130,
      key: 6,
    },
    {
      id: 7,
      name: "Sharp Looks",
      location: "Dallas",
      image: "/assets/beaut-3.png",
      rating: 4.6,
      services: "Haircut, Beard Grooming, Hair Styling",
      price: "$32",
      role: "Barber",
      duration: "35 min",
      address: "404 Elm St, Dallas, TX",
      reviews: 100,
      key: 7,
    },
    {
      id: 8,
      name: "Barber Lounge",
      location: "Seattle",
      image: "/assets/beaut-1.png",
      rating: 4.5,
      services: "Haircut, Beard Trim, Hot Towel Shave",
      price: "$33",
      role: "Barber",
      duration: "40 min",
      address: "505 Pine St, Seattle, WA",
      reviews: 90,
      key: 8,
    },
  ];
  
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-2 mb-4">
      {/* 🔍 Search Bar */}
      <SearchBarByLocationAndArea
        placeholder1="Location"
        placeholder2="Health center, specialty, specialist..."
      />

      <Divider />
      {/* 👨‍⚕️ Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
        {data.map((doc, i) => (
          <BeautityCenterCard key={i} {...doc} />
        ))}
      </div>

      {/* 📄 Pagination (centered) */}
      <div className="flex justify-center mt-10">
        <Pagination total={total} current={current} onPageChange={handleNext} />
      </div>
    </div>
  );
}
