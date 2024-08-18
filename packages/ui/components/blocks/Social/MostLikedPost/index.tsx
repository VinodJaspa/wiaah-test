import React from "react";

interface MostLikedPostProps {
  image: string;
}

export const MostLikedPost: React.FC<MostLikedPostProps> = ({ image }) => {
  return (
    <div className="flex flex-col shadow-lg rounded-lg h-[390px] w-[272px]">
      <div className="relative">
        <img src={image} className="w-[272px] h-[300px] rounded-t-lg" />
        <div className="absolute left-2 top-2  font-medium rounded-md bg-black bg-opacity-40 p-2">
          <p className="text-white text-xs">Most Liked Post</p>
        </div>
      </div>
      <div className="flex justify-center w-[272px] items-center h-[90px] ">
        <button className=" text-white font-semibold bg-[#3CD399] w-[252px] h-[50px] flex justify-center items-center text-lg rounded-lg ">
          View Post
        </button>
      </div>
    </div>
  );
};
