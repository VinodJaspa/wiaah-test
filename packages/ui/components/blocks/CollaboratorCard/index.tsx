import React from "react";
import { Spacer } from "@UI";

export interface CollaboratorCardProps {
  name: string;
  imageUrl: string;
  location: string;
}

export const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
  imageUrl,
  location,
  name,
}) => {
  return (
    <div className="flex flex-col items-center rounded-md border-[1px] border-[#57bf9c] border-opacity-30">
      <img className="h-full w-full object-cover" src={imageUrl} alt={name} />
      <div className=" p-6">
        <Spacer spaceInRem={2} />
        <h1 className="w-full overflow-clip whitespace-nowrap text-lg font-bold">
          {name}
        </h1>
        <p>{location}</p>
      </div>
    </div>
  );
};
