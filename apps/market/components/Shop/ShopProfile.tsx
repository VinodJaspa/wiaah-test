import { Rate } from "antd";
import { ShopDetailsData } from "api";
import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";

import {
  Spacer,
  Button,
  Verified,
  useGetShopDetailsQuery,
  useSearchFilters,
  SpinnerFallback,
} from "ui";

export interface ShopProfileProps {
  shopId: string;
  fullWidth?: boolean;
}

export const ShopProfile: React.FC<ShopProfileProps> = ({ fullWidth }) => {
  const { filters } = useSearchFilters();
  const { data: res, isError, isLoading } = useGetShopDetailsQuery(filters);

  const router = useRouter();

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#32D298] to-[#5FE9D2]  py-8 md:flex-row md:items-stretch ">
      <div
        style={{ width: fullWidth ? "100%" : "" }}
        className="flex flex-col gap-4 px-8 md:flex-row"
      >
        <div
          style={{ width: fullWidth ? "100%" : "fit-content" }}
          className="relative flex h-96 w-fit flex-col items-center justify-end overflow-hidden rounded-md bg-white px-12"
        >
          <div className="absolute top-0 left-0 h-1/4 w-full bg-black "></div>
          {/* shop profile */}
          <div className="relative flex h-3/4 w-full flex-col items-center justify-between">
            <div className="absolute top-0 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white ">
              {/* shop thumbnail */}
              <SpinnerFallback isLoading={isLoading} isError={isError}>
                {res ? (
                  <img
                    className="h-full w-full object-cover"
                    src={res.data.thumbnail}
                    alt={res.data.name}
                  />
                ) : null}
              </SpinnerFallback>
            </div>
            <Spacer spaceInRem={5} />
            <div className="flex w-full flex-col items-center gap-2">
              {/* shop name, rating and creatation date */}
              <SpinnerFallback isLoading={isLoading} isError={isError}>
                {res ? (
                  <>
                    <div className="flex items-center gap-2 text-lg font-bold">
                      {/* shop name */}
                      {res.data.name}
                      {res.data.verified && (
                        <Verified className="text-primary" />
                      )}
                    </div>
                    <a href="#reviews" className="cursor-pointer">
                      {/* shop ratting */}
                      <Rate
                        className="cursor-pointer"
                        disabled
                        allowHalf
                        value={res.data.rating}
                      />
                    </a>
                    <div>
                      {/* shop creation date */}
                      {new Date(res.data.createdAt).toDateString()}
                    </div>
                  </>
                ) : null}
              </SpinnerFallback>
            </div>
            <Spacer spaceInRem={1} />
            <div className="flex gap-4">
              {/* buttons */}
              <div>
                {/* message button */}
                <Button>{t("Message", "Message")}</Button>
              </div>
              <div>
                {/* follow button */}
                <Button>{t("Follow", "Follow")}</Button>
              </div>
            </div>
            <Spacer />
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <div className="flex w-full items-center justify-end gap-2">
                  {/* shop location */}
                  {/* {location && (
                // <img
                //   className="h-4 w-4 object-cover"
                //   src={location.}
                //   alt={shopLocation.location}
                // />
              )} */}
                  {location
                    ? `${res.data.location.city}, ${res.data.location.country}`
                    : null}
                </div>
              ) : null}
            </SpinnerFallback>
            <Spacer />
          </div>
        </div>
        <div className="flex h-auto w-full flex-col gap-4 md:w-96 lg:w-[30rem]">
          {/* shop destails */}

          <div className="flex h-16 items-center justify-center rounded-md bg-white p-4 text-lg font-bold">
            {/* shop name */}
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? res.data.name : null}
            </SpinnerFallback>
          </div>
          <div className="h-full bg-white p-4">
            {/* shop Desc */}
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? res.data.description : null}
            </SpinnerFallback>
          </div>
        </div>
      </div>
    </div>
  );
};
