import React from "react";
import { AspectRatioImage } from "ui";

export interface SocialServicePostCardProps {
  label: string;
  name: string;
  thumbnail: string;
  id: string;
  onServiceClick?: (id: string) => any;
}

export const SocialServicePostCard: React.FC<SocialServicePostCardProps> = ({
  label,
  name,
  thumbnail,
  id,
  onServiceClick,
}) => {
  function handleServiceClick() {
    if (onServiceClick) {
      onServiceClick(id);
    }
  }
  return (
    <div
      onClick={() => handleServiceClick()}
      className="w-full cursor-pointer relative block"
    >
      <AspectRatioImage ratio={3 / 4} alt={name} src={thumbnail} >
      <div className=" absolute top-0 left-0 flex flex-col w-full text-lg bg-gray-500 bg-opacity-50 p-2 text-white">
        <p className="font-semibold  lg:text-2xl ">{name}</p>
        <p className="w-full text-lg font-bold text-right text-primary">
          {">>"} {label} {"<<"}
        </p>
      </div>

      </AspectRatioImage>
    </div>
  );
};
