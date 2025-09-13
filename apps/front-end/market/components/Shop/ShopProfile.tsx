import { BusinessType, ServiceType, StoreType } from "@features/API";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouting } from "routing";

import {
  Spacer,
  Button,
  Verified,
  useGetShopDetailsQuery,
  useSearchFilters,
  SpinnerFallback,
  QrcodeDisplay,
  Rate,
  GetShopDetailsQuery,
  FlagIcon,
  ServicesRequestKeys,
  LoginPopupState,
  LoginModal,
} from "ui";
import { getRandomName } from "utils";

export interface ShopProfileProps {
  shopId: string;
  fullWidth?: boolean;
}
import { isUserLoggedIn } from "state";
export const ShopProfile: React.FC<ShopProfileProps> = ({
  fullWidth,
  shopId,
}) => {
  const { filters } = useSearchFilters();
  const {
    data: _res,
    isError: _isError,
    isLoading: _isLoading,
  } = useGetShopDetailsQuery(shopId);
  const userLoggedIn = useRecoilValue(isUserLoggedIn);
  console.log(isUserLoggedIn, "isUserLoggedIn");
  const [isFollowing, setIsFollowing] = useState(false);

  const res = resMock;
  const { t } = useTranslation();
  const router = useRouter();
  const isError = false;
  const { visit } = useRouting();
  const [isOpen, setIsOpen] = useRecoilState(LoginPopupState);
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#32D298] to-[#5FE9D2]  py-8 md:flex-row md:items-stretch ">
      {/* <LoginModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleRoute={(route) => console.log("Redirect to:", route)}
      /> */}
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
              <SpinnerFallback isLoading={false} isError={isError}>
                {res ? (
                  <Image
                    className="h-full w-full object-cover"
                    src={res.thumbnail}
                    alt={res.name}
                    width={200}
                    height={200}
                  />
                ) : null}
              </SpinnerFallback>
            </div>
            <Spacer spaceInRem={5} />
            <div className="flex w-full flex-col items-center gap-2">
              {/* shop name, rating and creatation date */}
              <SpinnerFallback isLoading={false} isError={isError}>
                {res ? (
                  <>
                    <div className="flex items-center gap-2 text-lg font-bold">
                      {/* shop name */}
                      {res.name}
                      {res.verified && <Verified className="text-primary" />}
                    </div>
                    <p className="font-semibold cursor-pointer text-primary"
                      onClick={(e) => {
                        // alert("okk")
                        e.stopPropagation();
                        visit((routes) =>
                          routes.visitServiceOnMap(res.location, ServicesRequestKeys.hotels)
                        );
                      }}>
                      {t("Show on map")}
                    </p>
                    <a href="#reviews" className="cursor-pointer">
                      {/* shop ratting */}
                      <Rate
                        className="cursor-pointer"
                        allowHalf
                        rating={res.rating}
                      />
                    </a>
                    <p>
                      {/* shop creation date */}
                      {new Date(res.createdAt).toDateString()}
                    </p>
                  </>
                ) : null}
              </SpinnerFallback>
            </div>
            <Spacer spaceInRem={1} />
            <div className="flex gap-4">
              {/* buttons */}
              <div>
                {/* message button */}
                <Button onClick={() => {
                  if (!userLoggedIn) {
                    setIsOpen(true)
                  }
                  else {
                    router.push("/message");
                  }
                }}>{t("Message", "Message")}</Button>
              </div>
              <div>
                {/* follow button */}
                <Button
                  onClick={() => setIsFollowing((prev) => !prev)}
                >
                  {isFollowing ? t("UnFollow", "Unfollow") : t("Follow", "Follow")}
                </Button>
                
              </div>
            </div>
            <Spacer />
            <SpinnerFallback isLoading={false} isError={isError}>
              {res ? (
                <div className="flex w-full items-center justify-end gap-2">
                  {/* shop location */}
                  <FlagIcon code={res.location.countryCode} />
                  {res.location
                    ? ` ${res.location.state}, ${res.location.city}, ${res.location.country}`
                    : null}
                </div>
              ) : null}
            </SpinnerFallback>
            <Spacer />
          </div>
        </div>
        <div className="flex h-auto w-full flex-col gap-4 md:w-96 lg:w-[30rem]">
          {/* shop destails */}

          <div className="flex h-16 items-center justify-between rounded-md bg-white p-4 text-lg font-bold">
            {/* shop name */}
            <SpinnerFallback isLoading={false} isError={isError}>
              {res ? (
                <>
                  <p>{res.name}</p>

                  <QrcodeDisplay className="w-10" size={30} value={res.id} />
                </>
              ) : null}
            </SpinnerFallback>
          </div>
          <div className="h-full bg-white p-4">
            {/* shop Desc */}
            <SpinnerFallback isLoading={false} isError={isError}>
              {res ? res.description : null}
            </SpinnerFallback>
          </div>
        </div>
      </div>
    </div>
  );
};

const resMock: GetShopDetailsQuery["getUserShop"] = {
  storeType: StoreType.Service,
  type: ServiceType.BeautyCenter,
  ownerId: "",
  banner: "",
  businessType: BusinessType.Services,
  createdAt: new Date().toUTCString(),
  description:
    "Welcome to our stunning hotel room, where luxury and natural beauty blend seamlessly together. As you step into the room, you're immediately struck by the breathtaking sunset views visible through the floor-to-ceiling windows.",
  email: "test@email.com",
  id: "testid",
  images: [...Array(10)].map(() => "/shop.jpeg"),
  sellerProfile: {
    id: "",
    ownerId: "",
    photo: "/shop.jpeg",
    username: getRandomName().firstName,
  },
  location: {
    address: "Burj Al Arab Jumeirah Jumeira Road Umm Suqeim 3",
    city: "Dubai",
    country: "United Arab Emirates",
    lat: 45.464664,
    lon: 9.18854,
    postalCode: 1546,
    state: "state",
    countryCode: "AD",
  },
  name: "service name",
  phone: "1324658",
  rating: 5,
  reviews: 160,
  thumbnail: "/shop.jpeg",
  verified: true,
  videos: [],
  workingSchedule: {
    id: "",
    weekdays: {
      mo: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      tu: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      we: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      th: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      fr: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      sa: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
      su: {
        periods: [
          new Date(2023, 4, 15, 10).toUTCString(),
          new Date(2023, 4, 15, 18).toUTCString(),
        ],
      },
    },
  },
};
