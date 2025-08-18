// app/components/DoctorCard.tsx
"use client";

import Image from "next/image";

type DoctorCardProps = {
  name: string;
  specialty: string;
  address: string;
  image: string;
};

export function DoctorCard({ name, specialty, address, image }: DoctorCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Doctor Image */}
      <div className="relative w-full h-64 border-2">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
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
