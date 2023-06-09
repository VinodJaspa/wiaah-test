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
} from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import { useResponsive } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";

export const PlaceView: React.FC<{
  slug: string;
}> = ({ slug }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { data, fetchNextPage } = useGetFilteredShopsInfiniteQuery(
    {
      categoryQuery: slug,
      take: 10,
    },
    {
      getNextPageParam: (last, all) => {
        return last.nextCursor;
      },
    }
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
            <p className="text-2xl font-medium">{slug}</p>
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
          {mapArray(data?.pages, (page) => (
            <>
              {mapArray(page.data, (shop) => (
                <LocalizationShopCard
                  storeType={shop.storeType}
                  categoryLabel={`${
                    shop.storeType === StoreType.Product
                      ? `${shop.storeCategory} ${t("Store")}`
                      : `${shop.type} ${t("Service")}`
                  }`}
                  id={shop.id}
                  sellerId={shop.ownerId}
                  sellerThumbnail={shop?.sellerProfile?.photo}
                  thumbnail={shop.thumbnail}
                  location={`${shop.location?.address}, ${shop.location?.city}, ${shop.location?.country}`}
                  title={shop.name}
                  verified={shop.verified}
                  isOpen={shop?.workingSchedule?.isOpen}
                  openFromDate={new Date(shop?.workingSchedule?.openFrom)}
                  openToDate={new Date(shop?.workingSchedule?.openTo)}
                />
              ))}
            </>
          ))}
        </div>
      </ScrollCursorPaginationWrapper>
    </div>
  );
};
