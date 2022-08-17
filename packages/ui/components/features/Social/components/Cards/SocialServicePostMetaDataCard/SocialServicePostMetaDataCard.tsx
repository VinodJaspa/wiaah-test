import { ServicePostMetaDataType } from "api";
import React from "react";
import { AspectRatioImage } from "ui";

export interface SocialServicePostMetaDataCardProps
  extends ServicePostMetaDataType {
  onClick?: (id: string) => any;
}

export const SocialServicePostMetaDataCard: React.FC<
  SocialServicePostMetaDataCardProps
> = ({ id, label, name, thumbnail, onClick }) => {
  return (
    <AspectRatioImage
      onClick={() => onClick && onClick(id)}
      ratio={3 / 4}
      alt={name}
      src={thumbnail}
    >
      <div className="cursor-pointer absolute top-0 left-0 flex flex-col w-full text-lg bg-gray-500 bg-opacity-50 p-2 text-white">
        <p className="font-semibold  lg:text-2xl ">{name}</p>
        <p className="w-full text-lg font-bold text-right text-primary">
          {">>"} {label} {"<<"}
        </p>
      </div>
    </AspectRatioImage>
  );
};
