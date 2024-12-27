import React from "react";

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgUrl?: string;
  name?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imgUrl,
  name = "",
  ...props
}) => {
  return (
    <>
      <div className="w-70 block space-y-3 cursor-pointer" {...props}>
        <img src={imgUrl} alt="img" className="w-70 h-70 object-cover" />
        <div className="flex w-full justify-center">
          <p className="uppercase">{name}</p>
        </div>
      </div>
    </>
  );
};
