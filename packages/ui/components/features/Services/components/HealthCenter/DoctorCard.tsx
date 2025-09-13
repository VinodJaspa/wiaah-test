"use client";

import Image from "next/image";
import { useRouter } from "next/router";

type DoctorCardProps = {
  id: string; // Added ID for redirect
  name: string;
  specialty: string;
  address: string;
  image: string;
};

export function DoctorCard({ id, name, specialty, address, image }: DoctorCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Doctor Image with hover overlay */}
      <div className="relative w-full h-64 group">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <button
            onClick={() => router.push(`/service/health_center/${id}`)}
            className="bg-white  font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-blue-600 font-medium">{specialty}</p>
        <p className="text-xs text-gray-500">{address}</p>
      </div>
    </div>
  );
}
