import React from "react";

interface ImageCardProps {
  imgUrl?: string;
  name?:string
}

export const ImageCard: React.FC<ImageCardProps> = ({ imgUrl, name='' }) => {
  return (
    <>
      <div className="block w-70 space-y-3">
        <img src={imgUrl} alt="img" className="w-70 h-70 object-cover" />
        <div className="flex w-full justify-center">
          <p className="uppercase">{name}</p>
        </div>
      </div>
    </>
  );
};
