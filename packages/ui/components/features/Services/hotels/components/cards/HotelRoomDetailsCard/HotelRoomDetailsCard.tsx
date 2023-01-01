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
  ServicePropertiesSwticher,
  PropertyDimensionsIcon,
  Stack,
  Divider,
  Badge,
  Checkbox,
} from "@UI";
import { ImImages } from "react-icons/im";
import { mapArray } from "utils";
import { Form, Formik } from "formik";

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
  extraServices,
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
                  <Slider>
                    {mapArray(thumbnails, (src, i) => (
                      <img
                        src={src}
                        key={i}
                        className="w-full h-full object-cover"
                      />
                    ))}
                  </Slider>
                </AspectRatio>
              </div>
              <div className="flex flex-col w-full gap-5">
                <div className="flex gap-4 justify-between">
                  <p className="font-bold text-base text-title">{title}</p>
                  {size ? (
                    <div className="flex items-center gap-2 text-lightBlack">
                      <PropertyDimensionsIcon className="text-sm" />
                      <div className="flex items-center">
                        {size.inMeter}
                        <MathPowerDisplay power={2}>m</MathPowerDisplay>
                      </div>
                      /
                      <div className="flex items-center">
                        {size.inFeet}
                        <MathPowerDisplay power={2}>ft</MathPowerDisplay>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  {mapArray(includes, (data, i) => (
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
                  {mapArray(amenities, (ame, i) => (
                    <HStack key={i}>
                      <ServicePropertiesSwticher slug={ame.slug} />
                      <p className="font-medium text-darkBrown text-xs">
                        {t(ame.name)}
                      </p>
                    </HStack>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="flex gap-x-10 gap-y-2 flex-wrap">
                {mapArray(extras, (extra, i) => (
                  <p className="text-lightBlack text-xs font-semibold" key={i}>
                    {extra}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <p className="text-base font-bold text-title">
                    {t("Cancelation Policy")}
                  </p>
                  <div className="flex flex-col gap-4">
                    {mapArray(cancelationPolicies, (data, i) => (
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
                    {mapArray(extraServices, (data, i) => (
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
                  <PriceDisplay price={price} />

                  <div className="text-sm flex gap-1 text-lightBlack items-center font-normal">
                    <UnDiscountedPriceDisplay
                      amount={price}
                      discount={discount.amount}
                    />
                    /<p className="text-black">{t("night")}</p>
                  </div>
                </div>
                <p className="text-secondaryRed text-sm font-medium">
                  {t("Only") +
                    ` ${discount.units} ` +
                    t("Tickets left at this price on our site")}
                </p>
                {with_fees_and_taxes ? (
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
