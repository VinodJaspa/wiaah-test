import { Rate } from "antd";
import { t } from "i18next";
import React from "react";

import { Spacer, Button, Verified } from "ui";

export interface ShopProfileProps {
  shop: Shop;
}

export interface Shop {
  shopName: string;
  shopDetails: string;
  shopRating: number;
  shopSince: string;
  shopThumbnailUrl: string;
  verified?: boolean;
  shopLocation: {
    location: string;
    flag: string;
  };
}

export const ShopProfile: React.FC<ShopProfileProps> = ({
  shop: {
    shopDetails,
    shopLocation,
    verified = false,
    shopName,
    shopRating,
    shopSince,
    shopThumbnailUrl,
  },
}) => {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#32D298] to-[#5FE9D2]  py-8 md:flex-row md:items-stretch ">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex h-96 w-fit flex-col items-center justify-end overflow-hidden rounded-md bg-white px-12">
          <div className="absolute top-0 left-0 h-1/4 w-full bg-black "></div>
          {/* shop profile */}
          <div className="relative flex h-3/4 w-full flex-col items-center justify-between">
            <div className="absolute top-0 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white ">
              {/* shop thumbnail */}
              <img
                className="h-full w-full object-cover"
                src={shopThumbnailUrl}
                alt={shopName}
              />
            </div>
            <Spacer spaceInRem={5} />
            <div className="flex w-full flex-col items-center gap-2">
              {/* shop name, rating and creatation date */}
              <div className="flex items-center gap-2 text-lg font-bold">
                {/* shop name */}
                {shopName}
                {verified && <Verified />}
              </div>
              <div>
                {/* shop ratting */}
                <Rate disabled allowHalf value={shopRating} />
              </div>
              <div>
                {/* shop creation date */}
                {shopSince}
              </div>
            </div>
            <Spacer spaceInRem={1} />
            <div className="flex gap-4">
              {/* buttons */}
              <div>
                {/* message button */}
                <Button
                  hexBackgroundColor="#5FE9D4"
                  text={t("Message", "Message")}
                />
              </div>
              <div>
                {/* follow button */}
                <Button
                  hexBackgroundColor="#5FE9D4"
                  text={t("Follow", "Follow")}
                />
              </div>
            </div>
            <Spacer />
            <div className="flex w-full items-center justify-end gap-2">
              {/* shop location */}
              {shopLocation.flag && (
                <img
                  className="h-4 w-4 object-cover"
                  src={shopLocation.flag}
                  alt={shopLocation.location}
                />
              )}
              {shopLocation.location}
            </div>
            <Spacer />
          </div>
        </div>
        <div className="flex h-auto w-full flex-col gap-4 md:w-96 lg:w-[30rem]">
          {/* shop destails */}
          <div className="flex h-16 items-center justify-center rounded-md bg-white p-4 text-lg font-bold">
            {/* shop name */}
            {shopName}
          </div>
          <div className="h-full bg-white p-4">
            {/* shop Desc */}
            {shopDetails}
          </div>
        </div>
      </div>
    </div>
  );
};
