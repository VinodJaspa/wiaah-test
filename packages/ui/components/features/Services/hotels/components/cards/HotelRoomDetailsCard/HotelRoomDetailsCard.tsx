import React from "react";
import { useTranslation } from "react-i18next";
import {
  PriceDisplay,
  AspectRatio,
  Button,
  HStack,
  MathPowerDisplay,
  UnDiscountedPriceDisplay,
  ServicePropertiesSwticher,
  PropertyDimensionsIcon,
  Stack,
  Divider,
  Image,
  CloseIcon,
} from "@UI";
import {
  Discount,
  HotelRoom,
  Maybe,
  Service,
  ServiceAdaptation,
  ServiceAmenity,
  ServiceCancelationPolicy,
  ServiceDailyPrices,
  ServiceDiscount,
  ServiceExtra,
  ServicePresentation,
  ServicePropertyMeasurements,
} from "@features/API";
import { mapArray } from "utils";
import { startCase } from "lodash";
import { ImCheckmark } from "react-icons/im";

export interface HotelRoomDetailsCardProps {
  onBook?: (roomId: string) => any;
  room: Pick<
    HotelRoom,
    | "bathrooms"
    | "beds"
    | "createdAt"
    | "dailyPrice"
    | "description"
    | "hotelId"
    | "id"
    | "includedAmenities"
    | "includedServices"
    | "num_of_rooms"
    | "pricePerNight"
    | "rating"
    | "updatedAt"
    | "title"
    | "sellerId"
    | "reviews"
    | "adaptedFor"
    | "title"
    | "pricePerNight"
    | "thumbnail"
  > & {
    cancelationPolicies?: Array<
      Pick<ServiceCancelationPolicy, "cost" | "duration">
    >;
    discount?: Pick<ServiceDiscount, "units" | "value">;
    dailyPrices?: Maybe<
      Pick<ServiceDailyPrices, "fr" | "mo" | "sa" | "su" | "th" | "tu" | "we">
    >;
    extras?: Maybe<
      Array<
        { __typename?: "ServiceExtra" } & Pick<ServiceExtra, "cost" | "name">
      >
    >;
    measurements?: {
      __typename?: "ServicePropertyMeasurements";
    } & Pick<ServicePropertyMeasurements, "inFeet" | "inMeter">;
    popularAmenities?: Maybe<Array<Pick<ServiceAmenity, "label" | "value">>>;
    presentations?: Array<Pick<ServicePresentation, "src" | "type">>;
  };
}

export const HotelRoomDetailsCard: React.FC<HotelRoomDetailsCardProps> = ({
  room,
  onBook,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <Stack col divider={<Divider className="my-5" />}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="min-w-[11.25rem] h-fit overflow-hidden rounded-xl">
            <AspectRatio ratio={1}>
              <Image
                src={room.thumbnail}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col w-full gap-5">
            <div className="flex gap-4 justify-between">
              <p className="font-bold text-base text-title">{room.title}</p>
              {room.measurements ? (
                <div className="flex items-center gap-2 text-lightBlack">
                  <PropertyDimensionsIcon className="text-sm" />
                  <div className="flex items-center">
                    {room.measurements.inMeter}
                    <MathPowerDisplay power={2}>m</MathPowerDisplay>
                  </div>
                  /
                  <div className="flex items-center">
                    {room.measurements.inFeet}
                    <MathPowerDisplay power={2}>ft</MathPowerDisplay>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {mapArray(room.includedAmenities!, (data, i) => (
                <div
                  key={i}
                  className="bg-primary-100 rounded-full px-2 py-1 text-primary-400"
                >
                  {data} {t("included")}
                </div>
              ))}
            </div>
            <div
              style={{ gridTemplateColumns: `repeat(${3},1fr)` }}
              className={`w-full grid gap-4 text-primary text-xl thinScroll overflow-y-scroll`}
            >
              {mapArray(room.includedAmenities!, (ame, i) => (
                <HStack key={i}>
                  <ServicePropertiesSwticher slug={ame} />
                  <p className="font-medium text-darkBrown text-xs">{t(ame)}</p>
                </HStack>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-6">
          {/* <div className="flex gap-x-10 gap-y-2 flex-wrap">
                {mapArray(room.extras!, (extra, i) => (
                  <p className="text-lightBlack text-xs font-semibold" key={i}>
                    {extra.name} - {extra.cost}
                  </p>
                ))}
              </div> */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="text-base font-bold text-title">
                {t("Adapeted for")}
              </p>
              <div className="flex flex-col gap-4">
                {mapArray(Object.values(ServiceAdaptation), (data, i) => (
                  <HStack>
                    {room.adaptedFor?.includes(data) ? (
                      <div className="text-primary p-2">
                        <ImCheckmark />
                      </div>
                    ) : (
                      <div className="text-red-500 p-2 ">
                        <CloseIcon />
                      </div>
                    )}
                    <p>{startCase(data)}</p>
                  </HStack>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-base font-bold text-title">{t("Extras")}</p>
              <div className="flex flex-col gap-4">
                {mapArray(room.extras!, (data, i) => (
                  <div
                    key={i}
                    className="flex items-center text-xs font-normal text-lightBlack justify-between gap-4"
                  >
                    <p className=" font-semibold text-lg">{data.name}</p>
                    {data.cost > 0 ? (
                      <PriceDisplay
                        className="text-primary font-bold"
                        price={data.cost}
                      />
                    ) : (
                      t("FREE")
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center flex-wrap gap-5">
            <div className="text-lg items-center flex gap-2 font-bold text-black">
              <PriceDisplay price={room.pricePerNight} />

              {room.discount ? (
                <>
                  <div className="text-sm flex gap-1 text-lightBlack items-center font-normal">
                    <UnDiscountedPriceDisplay
                      amount={
                        room.pricePerNight +
                        room.discount.value * room.pricePerNight
                      }
                      discount={room.discount.value}
                    />
                    /<p className="text-black">{t("night")}</p>
                  </div>
                </>
              ) : null}
            </div>
            {room.discount ? (
              <>
                <p className="text-secondaryRed text-sm font-medium">
                  {t("Only") +
                    ` ${room.discount.units} ` +
                    t("Tickets left at this price on our site")}
                </p>
              </>
            ) : null}
            {/* {fees ? (
                  <p className="text-lightBlack">{t("Include tax & fees")}</p>
                ) : (
                  ""
                )} */}
          </div>
          <Button
            onClick={() => onBook && onBook(room.id)}
            className="text-[1.375rem] text-white font-bold"
          >
            {t("Book Now")}
          </Button>
        </div>
      </Stack>
    </div>
  );
};
