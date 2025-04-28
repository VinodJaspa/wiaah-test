import { NumberShortner, isDate, mapArray, randomNum } from "@UI/../utils/src";
import { StoreType } from "@features/API";
import { useGetFilteredShopsInfiniteQuery } from "@features/Shop";
import {
  AspectRatio,
  Avatar,
  Button,
  HStack,
  Image,
  LocationIcon,
  LocationOutlineIcon,
  ScrollCursorPaginationWrapper,
  Verified,
} from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import { useResponsive } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "placeholder";

const FAKEDATA = [
  {
    sellerThumbnail: getRandomImage(),
    name: "fake name",
    ownerId: "33",
    thumbnail: getRandomImage(),
    title: "Sample Product Title",
    verified: true,
    openFromDate: new Date("2023-06-01"),
    openToDate: new Date("2023-12-31"),
    isOpen: true,
    id: "product1",
    sellerId: "seller1",
    categoryLabel: "Electronics",
    storeType: StoreType.Product,
    storeCategory: "cat",
    location: {
      country: "fake country",
      city: "fake city",
      address: "fake address",
    },
  },
];

export const LocalizationView: React.FC<{ locationSlug: string }> = ({
  locationSlug,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { isMobile } = useResponsive();

  // // WARNING: This graphql endpoint query is not ready yet so I replaced it with placeholder once it's ready replace it back
  const { data, fetchNextPage } = useGetFilteredShopsInfiniteQuery(
    {
      locationQuery: locationSlug,
      take: 10,
    },
    {
      getNextPageParam: (last, all) => {
        return last.cursor;
      },
    },
  );

  const hasMore = !!data?.pages.at(-1);

  // TODO: fetch this data
  const locationQueryViews = randomNum(1000000);

  return (
    <div>
      {isMobile ? <SectionHeader sectionTitle={t("Localization")} /> : null}
      <HStack className="justify-between">
        <div className="flex gap-2">
          <LocationIcon className="text-2xl" />
          <div className="flex flex-col">
            <p className="text-2xl font-medium">{locationSlug}</p>
            <p>{`(${NumberShortner(locationQueryViews)} ${t("Views")})`}</p>
          </div>
        </div>
        <Button colorScheme="darkbrown" onClick={() => {}}>
          {t("Follow")}
        </Button>
      </HStack>
      <ScrollCursorPaginationWrapper
        controls={{ hasMore, next: () => fetchNextPage() }}
      >
        <div className="grid grid-col-2 md:grid-col-3 xl:grid-cols-4">
          {/*{mapArray(data?.pages, (page) => ( */}
          <>
            {mapArray(FAKEDATA, (shop) => (
              <LocalizationShopCard
                storeType={shop.storeType}
                categoryLabel={`${
                  shop.storeType === StoreType.Product
                    ? `${shop.storeCategory} ${t("Store")}`
                    : `${shop.storeType} ${t("Service")}`
                }`}
                id={shop.id}
                sellerId={shop.ownerId}
                sellerThumbnail={shop.sellerThumbnail}
                thumbnail={shop.thumbnail}
                location={`${shop.location.address}, ${shop.location.city}, ${shop.location.country}`}
                title={shop.name}
                verified={shop.verified}
              />
            ))}
          </>
          ))
        </div>
      </ScrollCursorPaginationWrapper>
    </div>
  );
};

export const LocalizationShopCard: React.FC<{
  thumbnail: string;
  title: string;
  verified: boolean;
  openFromDate?: Date;
  openToDate?: Date;
  isOpen?: boolean;
  id: string;
  sellerId: string;
  categoryLabel: string;
  sellerThumbnail: string;
  location: string;
  storeType: StoreType;
}> = ({
  id,
  openFromDate,
  openToDate,
  sellerId,
  thumbnail,
  title,
  sellerThumbnail,
  verified,
  categoryLabel,
  isOpen,
  location,
  storeType,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const validOpenTime = isDate(openFromDate) && isDate(openToDate);
  return (
    <div className="flex flex-col gap-2 w-full">
      <AspectRatio ratio={1.2}>
        <Image src={thumbnail} className="w-full h-full object-cover" />
        <div className="absolute text-xs top-1 left-1 bg-black/30 text-white">
          {categoryLabel}
        </div>
      </AspectRatio>

      <div className="flex gap-2">
        <Avatar
          className="max-w-[1.5rem] max-h-[1.5rem]"
          src={sellerThumbnail}
        />
        <p>{title}</p>

        {verified ? <Verified className="text-secondaryBlue" /> : null}
      </div>

      <HStack className="text-xs">
        <LocationOutlineIcon />
        <p>{location}</p>
      </HStack>

      {validOpenTime ? (
        <HStack className="text-xs">
          <p>{isOpen ? t("Open") : t("Closed")}</p>
          <p>{`(${new Date(openFromDate as Date).toTimeString()} - ${new Date(
            openToDate as Date,
          ).toTimeString()})`}</p>
        </HStack>
      ) : null}

      <Button onClick={() => {}} className="w-full" colorScheme="darkbrown">
        {t("Follow")}
      </Button>
    </div>
  );
};
