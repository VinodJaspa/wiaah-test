import React, { useState, useEffect } from "react";
import { useRouting } from "routing";
import { ServicesType } from "types";
import { colorShades, AspectRatioImage } from "@UI";

export interface CardProps {
  imgUrl: string;
  id: string;
  name: string;
  type: string;
  label: string;
  onShopClick?: (shopId: string) => void;
}

export const RecommendedShopCard: React.FC<CardProps> = ({
  imgUrl,
  name = "",
  id,
  onShopClick,
  label,
  type,
}) => {
  let [shadeColor, setShadeColor] = useState<string | undefined>();

  useEffect(() => {
    setShadeColor(colorShades[Math.floor(Math.random() * 5)]);
  }, [shadeColor]);

  function handleShopClick() {
    if (onShopClick) {
      onShopClick(id);
    }
  }

  return (
    <>
      <div
        onClick={() => handleShopClick()}
        className="w-full cursor-pointer relative block"
      >
        <div className="flex flex-col w-full text-lg bg-black p-2 text-white">
          <p className="text-white font-semibold">{name}</p>
          <p className="w-full text-right text-primary">
            {">>"} {label} {"<<"}
          </p>
        </div>
        <AspectRatioImage ratio={3 / 4} alt={name} src={imgUrl}>
          <div
            className={`flex h-12 w-full ${shadeColor} absolute bottom-0 opacity-75`}
          ></div>
        </AspectRatioImage>
      </div>
    </>
  );
};
