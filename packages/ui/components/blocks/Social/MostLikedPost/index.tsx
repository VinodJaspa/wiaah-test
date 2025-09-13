import React from "react";

interface MostLikedPostProps {
  image: string;
}

export const MostLikedPost: React.FC<MostLikedPostProps> = ({ image }) => {
  return (
    <div className="flex flex-col shadow-md rounded-lg w-[160px] md:w-[190px] bg-white">
      <div className="relative w-full h-[120px] md:h-[160px]">
        <img
          src={image}
          alt="Most Liked"
          className="rounded-t-lg w-full h-full object-cover"
        />
        <div className="absolute left-2 top-2 font-medium rounded bg-black bg-opacity-50 px-2 py-0.5">
          <p className="text-white text-xs md:text-sm">Most Liked</p>
        </div>
      </div>
      <div className="pb-3 pt-2">
        <button className="text-white font-medium bg-[#3CD399] w-full h-9 md:h-10 text-sm md:text-base rounded-md shadow-sm hover:shadow-md transition-shadow">
          View Post
        </button>
      </div>
    </div>
  );
};
