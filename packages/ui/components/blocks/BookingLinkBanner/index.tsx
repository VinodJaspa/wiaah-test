import { Divider } from "@UI";
import React from "react";
import { GoLink } from "react-icons/go";

type BookingLinkBannerProps = {
  link?: string;
  showLink: boolean;
};
export const BookingLinkBanner: React.FC<BookingLinkBannerProps> = ({
  link,
  showLink,
}) => {
  return (
    <div
      className={`flex items-center gap-8 mb-3 ${!showLink && "justify-end"}`}
    >
      {showLink && (
        <div className="flex items-center border border-green-300 rounded px-2 py-1 w-full max-w-md">
          <GoLink className="w-5 h-5 text-[#000000] opacity-60" />
          <Divider
            variant="vert"
            className="border-[#000000] opacity-60 h-[2rem]"
          />
          <input
            type="text"
            value={link}
            className="border-0 focus:ring-0 focus:outline-none ml-2 text-sm w-full"
          />
        </div>
      )}
      <div className={`flex gap-2 items-center `}>
        <button className=" h-[34px] w-[107px]  flex items-center justify-center flex-nowrap bg-[#3CD399] text-white font-semibold text-sm py-1 px-4  rounded-md">
          Book Now
        </button>
      </div>
    </div>
  );
};
