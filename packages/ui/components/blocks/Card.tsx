import React, { useState, useEffect } from "react";
import { colorShades } from "../helpers/colorShades";

interface CardProps {
  imgUrl?: string;
  name?:string
}

export const Card: React.FC<CardProps> = ({ imgUrl, name="" }) => {
  let [shadeColor, setShadeColor] = useState<string | undefined>();

  useEffect(() => {
    setShadeColor(colorShades[Math.floor(Math.random() * 5)]);
  }, [shadeColor]);

  return (
    <>
      <div className="block w-70 relative">
        <div className="flex w-full p-4 justify-center bg-black text-white">
          <p className="uppercase">{name}</p>
        </div>
        <img src={imgUrl} alt="shop_img" className="w-full h-56 object-cover" />
        <div
          className={`flex w-full h-20 ${shadeColor} absolute bottom-0 opacity-75`}
        ></div>
      </div>
    </>
  );
};
