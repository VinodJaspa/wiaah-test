import { mapArray } from "@UI/../utils/src";
import { NumberShortner, randomNum } from "@UI/components/helpers";
import { StoreType } from "@features/API";
import { LocalizationShopCard } from "@features/Localization/views";
import { useGetFilteredShopsInfiniteQuery } from "@features/Shop";
import {
  Button,
  HStack,
  LocationIcon,
  ScrollCursorPaginationWrapper,
  useCursorScrollPagination,
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
    storeCategory: "Shoes",
    location: {
      country: "fake country",
      city: "fake city",
      address: "fake address",
    },
  },

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
    storeCategory: "Clothe",
    location: {
      country: "fake country",
      city: "fake city",
      address: "fake address",
    },
  },

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
    storeCategory: "Food",
    location: {
      country: "fake country",
      city: "fake city",
      address: "fake address",
    },
  },

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
    storeCategory: "Food",
    location: {
      country: "fake country",
      city: "fake city",
      address: "fake address",
    },
  },
];

export const PlaceView: React.FC<{
  slug: string;
}> = ({ slug }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { controls } = useCursorScrollPagination();

  // const { data, fetchNextPage } = useGetFilteredShopsInfiniteQuery(
  //   {
  //     categoryQuery: slug,
  //     take: 10,
  //   },
  //   {
  //     getNextPageParam: (last, all) => {
  //       return last.nextCursor;
  //     },
  //   }
  // );

  // const hasMore = !!FAKEDATA?.pages.at(-1);

  // TODO: fetch this data
  const locationQueryViews = randomNum(1000000);

  return (
    <div>
      {isMobile ? <SectionHeader sectionTitle={t("Localization")} /> : null}
      <HStack className="justify-between">
        <div></div>
        <div className="flex gap-2">
          <div className="flex flex-col items-center mb-4">
            <div className="flex gap-2">
              <LocationIcon className="text-2xl" />
              <p className="text-2xl font-medium">{slug}</p>
            </div>
            <p>{`(${NumberShortner(locationQueryViews)} ${t("Views")})`}</p>
          </div>
        </div>
        <Button colorScheme="darkbrown" onClick={() => { }}>
          {t("Follow")}
        </Button>
      </HStack>
      <ScrollCursorPaginationWrapper controls={controls}>
        <div className="gap-8 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {/*{mapArray(data?.pages, (page) => (*/}
          {mapArray(FAKEDATA, (shop) => (
            <LocalizationShopCard
              storeType={shop.storeType}
              categoryLabel={`${shop.storeType === StoreType.Product
                  ? `${shop.storeCategory} ${t("Store")}`
                  : `${"Service"} ${t("Service")}`
                }`}
              id={shop.id}
              sellerId={shop.ownerId}
              sellerThumbnail={shop?.sellerThumbnail}
              thumbnail={shop.thumbnail}
              location={`${shop.location?.address}, ${shop.location?.city}, ${shop.location?.country}`}
              title={shop.name}
              verified={shop.verified}
              isOpen={true}
              openFromDate={shop?.openFromDate}
              openToDate={shop?.openToDate}
            />
          ))}
        </div>
      </ScrollCursorPaginationWrapper>
    </div>
  );
};
