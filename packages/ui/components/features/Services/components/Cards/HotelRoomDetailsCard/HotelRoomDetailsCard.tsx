import { AmenitieType, HotelRoomDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Slider,
  ArrowLeftIcon,
  ArrowRightIcon,
  PopularAmenitiesSection,
  SearchFilter,
  PriceDisplay,
  AspectRatio,
  Button,
  HStack,
} from "ui";
import { ImImages } from "react-icons/im";

export interface HotelRoomDetailsCardProps extends HotelRoomDataType {}

export const HotelRoomDetailsCard: React.FC<HotelRoomDetailsCardProps> = ({
  amenities,
  thumbnails,
  title,
  with_fees_and_taxes,
  price,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full h-fit ">
      <AspectRatio ratio={4 / 6}>
        <Slider
          leftArrowComponent={() => (
            <div className="bg-white mx-4 text-primary p-2 bg-opacity-60 rounded-full text-xl">
              <ArrowLeftIcon />
            </div>
          )}
          rightArrowComponent={() => (
            <div className="bg-white mx-4 text-primary p-2 bg-opacity-60 rounded-full text-xl">
              <ArrowRightIcon />
            </div>
          )}
        >
          {Array.isArray(thumbnails)
            ? thumbnails.map((thumbnail, i) => (
                <img
                  className="w-full h-full object-cover"
                  src={thumbnail}
                  key={i}
                  alt={title}
                />
              ))
            : null}
        </Slider>
        <div className="absolute flex px-2  rounded items-center gap-2 text-xl right-4 bottom-4 bg-black bg-opacity-30 text-white">
          <ImImages />
          {thumbnails.length}
        </div>
      </AspectRatio>
      <div className="flex p-4 flex-col gap-4">
        <p>{title}</p>
        <PopularAmenitiesSection amenities={amenities} />
        <SearchFilter
          boldTitle
          filters={[
            {
              filterTitle: "Cancellation policy",
              filterDisplay: "text",
              filterSlug: "cancellation_policy",
              filterType: "radio",
              filterOptions: [
                {
                  optName: "Fully refundable before 28 Jul",
                  optSlug: "fully_refundable_28jul",
                },
                {
                  optName: "Fully refundable before 4 Aug",
                  optSlug: "fully_refundable_4aug",
                },
              ],
            },
            {
              filterTitle: "Extras",
              filterSlug: "extras",
              filterDisplay: "text",
              filterType: "radio",
              filterOptions: [
                {
                  optName: "No extras",
                  optSlug: "no_extras",
                },
                {
                  optName: "Book now, pay later",
                  optSlug: "book_pay_later",
                },
                {
                  optName: "Breakfast",
                  optSlug: "breakfast",
                },
                {
                  optName: "Breakfast + book now, pay later",
                  optSlug: "breakfast_book_now_pay_later",
                },
              ],
            },
          ]}
        />
        <div className="flex w-full justify-between items-end">
          <div className="flex flex-col gap-2">
            <HStack className="font-bold">
              <PriceDisplay
                className="text-2xl"
                priceObject={{ amount: price }}
              />{" "}
              / {t("night")}
            </HStack>
            <p>{t("for 1 night")}</p>
            {with_fees_and_taxes ? <p>{t("Includes taxes & fees")}</p> : null}
          </div>
          <Button>{t("Book now")}</Button>
        </div>
      </div>
    </div>
  );
};
