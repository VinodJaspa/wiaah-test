import React, { useState, useEffect } from "react";
import { colorShades } from "../helpers/colorShades";

interface CardProps {
  imgUrl?: string;
  name?: string;
}

export const Card: React.FC<CardProps> = ({ imgUrl, name = "" }) => {
  let [shadeColor, setShadeColor] = useState<string | undefined>();

  useEffect(() => {
    setShadeColor(colorShades[Math.floor(Math.random() * 5)]);
  }, [shadeColor]);

  return (
    <>
      <div className="w-70 relative block">
        <div className="flex w-full justify-center bg-black p-4 text-white">
          <p className="uppercase">{name}</p>
        </div>
        <img src={imgUrl} alt="shop_img" className="h-56 w-full object-cover" />
        <div
          className={`flex h-20 w-full ${shadeColor} absolute bottom-0 opacity-75`}
        ></div>
      </div>
    </>
  );
};
