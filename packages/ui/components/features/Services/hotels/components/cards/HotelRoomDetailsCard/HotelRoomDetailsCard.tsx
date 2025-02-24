import {
  HotelRoom,
  Maybe,
  ServiceAmenity,
  ServiceCancelationPolicy,
  ServiceDailyPrices,
  ServiceDiscount,
  ServiceExtra,
  ServicePresentation,
  ServicePropertyMeasurements,
} from "@features/API";
import {
  AspectRatio,
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  MathPowerDisplay,
  PriceDisplay,
  PropertyDimensionsIcon,
  Stack,
  UnDiscountedPriceDisplay,
} from "@partials";
import { ServiceCancelationPolicyInput } from "@UI/components/features/Services/components/Inputs/ServiceCancelationPolicyInput";
import { ServicePropertiesSwticher } from "@UI/components/features/Services/components/Switchers/ServicePropertiesSwticher";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";

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
    | "fees"
  > & {
    cancelationPolicies?: Array<
      Pick<ServiceCancelationPolicy, "id" | "cost" | "duration">
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
    popularAmenities?: Maybe<
      Array<Pick<ServiceAmenity, "label" | "value" | "slug">>
    >;
    presentations?: Array<Pick<ServicePresentation, "src" | "type">>;
  };
}

export const HotelRoomDetailsCard: React.FC<HotelRoomDetailsCardProps> = ({
  room,
  onBook,
}) => {
  const { t } = useTranslation();
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({ values, setFieldValue }) => (
        <Form>
          <Stack col divider={<Divider className="my-5" />}>
            <div className="flex gap-4">
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
                  {mapArray(room.popularAmenities!, (ame, i) => (
                    <HStack key={i}>
                      <ServicePropertiesSwticher slug={ame.slug} />
                      <p className="font-medium text-darkBrown text-xs">
                        {t(ame.label)}
                      </p>
                    </HStack>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="flex gap-x-10 gap-y-2 flex-wrap">
                {mapArray(room.includedServices!, (serv, i) => (
                  <p className="text-lightBlack text-xs font-semibold" key={i}>
                    {serv}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <p className="text-base font-bold text-title">
                    {t("Cancelation Policy")}
                  </p>
                  <div className="flex flex-col gap-4">
                    {mapArray(room.cancelationPolicies!, (data, i) => (
                      <ServiceCancelationPolicyInput
                        onSelected={() => {}}
                        name={"hotelCancelationPolicy"}
                        {...data}
                        key={i}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-base font-bold text-title">
                    {t("Extras")}
                  </p>
                  <div className="flex flex-col gap-4">
                    {mapArray(room.extras!, (data, i) => (
                      <div className="flex items-center text-xs font-normal text-lightBlack justify-between gap-4">
                        <Checkbox className="">{data.name}</Checkbox>
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
                {room.fees ? (
                  <p className="text-lightBlack">{t("Include tax & fees")}</p>
                ) : (
                  ""
                )}
              </div>
              <Button className="text-[1.375rem] text-white font-bold">
                {t("Book Now")}
              </Button>
            </div>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
