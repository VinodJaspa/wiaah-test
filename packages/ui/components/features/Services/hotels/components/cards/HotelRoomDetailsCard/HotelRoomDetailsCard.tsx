import { HotelRoomDataType } from "api";
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
  ServiceCancelationPolicyInput,
  SuccessIcon,
  MathPowerDisplay,
  UnDiscountedPriceDisplay,
  PropertyDimensionsIcon,
} from "ui";
import { ImImages } from "react-icons/im";
import { useSetBookedServicesState } from "state";

export interface HotelRoomDetailsCardProps extends HotelRoomDataType {
  onBook?: (roomId: string) => any;
}

export const HotelRoomDetailsCard: React.FC<HotelRoomDetailsCardProps> = ({
  amenities,
  thumbnails,
  title,
  with_fees_and_taxes,
  price,
  cancelationPolicies,
  extras,
  id,
  includes,
  size,
  discount,
  onBook,
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
      <div className="flex p-2 flex-col gap-4">
        <p className="font-bold text-xl">{title}</p>

        {size ? (
          <HStack>
            <PropertyDimensionsIcon /> {size.inMeter}
            <MathPowerDisplay power={2}>{t("m")}</MathPowerDisplay>/{" "}
            {size.inFeet}
            <MathPowerDisplay power={2}>{t("ft")}</MathPowerDisplay>
          </HStack>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {Array.isArray(includes)
            ? includes.map((item, i) => (
                <span
                  key={i}
                  className="rounded-lg border-2 border-green-500 px-2 py-1 text-green-500 "
                >
                  {t(item)} {t("included")}
                </span>
              ))
            : null}
        </div>

        <PopularAmenitiesSection amenities={amenities} />
        <div className="max-h-[10rem] overflow-y-scroll thinScroll gap-2 flex flex-wrap">
          {extras.map((extra, i) => (
            <div key={i} className="flex items-center gap-1">
              <SuccessIcon />
              {extra}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold">{t("Cancelation policy")}</p>
          {cancelationPolicies.map((policy, i) => (
            <ServiceCancelationPolicyInput
              {...policy}
              name="cancelationPolicy"
              onSelected={() => {}}
              key={`${i}-${policy.id}`}
            />
          ))}
        </div>
        <SearchFilter
          boldTitle
          filters={[
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
        <div className="flex flex-col w-full justify-between items-end">
          <div className="flex flex-col gap-2">
            <HStack className="font-bold">
              <PriceDisplay
                className="text-2xl"
                priceObject={{ amount: price }}
              />
              <UnDiscountedPriceDisplay
                className="text-gray-400"
                amount={price}
                discount={discount.amount}
              />{" "}
              / {t("night")}
            </HStack>
            <p className="text-lg font-bold text-red-500">
              {t("Only", "Only")} {discount.units}{" "}
              {t("Tickets left at this price on our site")}
            </p>
            {with_fees_and_taxes ? <p>{t("Includes taxes & fees")}</p> : null}
          </div>
          <Button onClick={() => onBook && onBook(id)}>{t("Book now")}</Button>
        </div>
      </div>
    </div>
  );
};
