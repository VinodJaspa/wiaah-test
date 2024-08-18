import { NumberShortner } from "@UI/../utils/src";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

interface PlacesListProps {
  places: PlaceCardProps[];
}

export const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  return (
    <div className="w-full space-y-3 flex flex-col items-center mx-3 md:mx-0">
      {places.map((place: PlaceCardProps) => (
        <PlaceCard
          title={place.title}
          location={place.location}
          type={place.type}
        />
      ))}
    </div>
  );
};

interface PlaceCardProps {
  title: string;
  location: string;
  type: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ title, location, type }) => {
  return (
    <div className="md:w-1/2 w-full  flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="rounded-lg border border-gray-300 p-2">
          <FaLocationDot className="w-4 h-4 text-[#20ECA7]" />
        </div>
        <div className="flex flex-col gap-1">
          <p className=" font-medium">{title}</p>
          <p className=" font-medium text-xs text-[#656565]">{location}</p>
        </div>
      </div>
      <div className="">
        <p className="  text-xs font-semibold text-[#20ECA7]">{type}</p>
      </div>
    </div>
  );
};
