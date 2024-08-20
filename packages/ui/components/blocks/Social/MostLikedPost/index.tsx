import React from "react";

interface MostLikedPostProps {
  image: string;
}

export const MostLikedPost: React.FC<MostLikedPostProps> = ({ image }) => {
  return (
    <div className="flex flex-col shadow-lg rounded-lg md:h-[390px] h-[187px] md:w-[272px] w-[160px] ">
      <div className="relative w-full h-3/4 ">
        <img src={image} className=" rounded-t-lg w-full h-full" />
        <div className="absolute left-2 top-2  font-medium rounded-md bg-black bg-opacity-40 p-2">
          <p className="text-white text-xs">Most Liked Post</p>
        </div>
      </div>
      <div className="flex justify-center w-full items-center h-1/4  px-2.5 ">
        <button className=" text-white font-semibold bg-[#3CD399] md:w-[252px] w-[150px]  h-1/2 flex justify-center items-center md:text-lg text-sm md:rounded-lg rounded py-2 ">
          View Post
        </button>
      </div>
    </div>
  );
};
