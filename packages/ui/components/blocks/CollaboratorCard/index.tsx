import React from "react";
import { Spacer } from "ui";

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
    <div className="flex flex-col items-center rounded-md border-[1px] border-[#57bf9c] border-opacity-30 p-6">
      <div className="h-36 w-52">
        {/* image */}
        <img className="h-full w-full object-cover" src={imageUrl} alt={name} />
      </div>
      <Spacer spaceInRem={2} />
      <h1 className="w-full overflow-clip whitespace-nowrap text-lg font-bold">
        {name}
      </h1>
      <p>{location}</p>
    </div>
  );
};
