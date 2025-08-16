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
    <div className="flex flex-col items-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
      <div className="w-32 h-32 relative mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{specialty}</p>
      <p className="text-sm text-gray-500">{address}</p>
    </div>
  );
}
