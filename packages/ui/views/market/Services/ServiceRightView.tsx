import React from "react";
import {
  BookingEventPopup,
  CloseIcon,
  WishListIcon,
  useCartSummary,
  Button,
  Rate,
  SpinnerFallback,
  ServiceRulesDisplay,
  ServiceTransportDisplay,
  ServicePropertyDetailsDisplay,
  VideoCameraIcon,
  HStack,
  useGetServiceCategory,
} from "@UI";
import { Event } from "@UI";
import { useGetServiceMetadataQuery } from "@UI";
import { getTimeInAmPm } from "utils";
import { useTranslation } from "react-i18next";
import { useServiceBookedRange, useServiceBookingModal } from "state";
import { ServiceAdaptation, ServiceType } from "@features/API";

export interface ServiceRightViewProps {
  serviceId: string;
}

export const ServiceRightView: React.FC<ServiceRightViewProps> = ({
  serviceId,
}) => {
  const { range } = useServiceBookedRange();
  const { openBookEvent, openBookRange } = useServiceBookingModal();
  const { data, isLoading, isError } = useGetServiceMetadataQuery({
    id: serviceId,
  });
  const { data: category } = useGetServiceCategory(data?.id || "");

const { t } = useTranslation();
  const { AddNewItem } = useCartSummary();
  const [event, setEvent] = React.useState<Event>();

  function handleCancelBookedEvent() {
    setEvent(undefined);
  }

  function handleOnSuccess(event: Event) {
    setEvent(event);
  }
  function handleAddToWishList() {
    // add to wishList
  }

  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      {data ? (
        <div className="flex w-full h-full flex-col justify-between gap-2">
          <div className="flex h-full flex-col gap-2 items-start">
            <div>
              <samp className="green-text">{category?.name}</samp>
              <h1 className="m-0 text-2xl font-bold text-gray-800 ">
                {data.name}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="inline-flex items-center">
                <Rate allowHalf rating={data.rating} />
              </div>
              <div className="mx-3 h-5 w-px bg-gray-300"></div>
              <span className="text-gray-500">
                {data.reviews} {t("Reviews", "Reviews")}
              </span>
            </div>
            <div className="flex gap-4 items-center font-bold">
              <span className="product-price text-3xl">
                ${data.price}
                100
              </span>
              {/* {!data?.price?.value ? (
                ""
              ) : ( */}
              <span className="text-2xl text-slate-400 line-through">
                ${data?.price}
                110
              </span>
              {/* )} */}
              <p className="inline text-xl">/{t("night")}</p>
            </div>
            <div className="inline-block rounded-md bg-red-400 px-4 py-1 font-bold text-white">
              <span>{data?.discount?.value}% </span>
              <span>{t("OFF", "OFF")}</span>
            </div>
            <div>
              {data?.discount?.units && (
                <p className="text-lg font-bold text-red-500">
                  {t("Only", "Only")} {data.discount.units}{" "}
                  {t("Tickets left at this price on our site")}
                </p>
              )}
            </div>
            <div>
              <span className="font-bold">
                {data?.availableAppointments
                  ? t("Service Available") + ":" + data.availableAppointments
                  : t("Service Not Available")}{" "}
              </span>
            </div>
            <div className="text-lg">
              {/* There is no videoConsulation field in the hole Schema file I commented it for a while */}
              {/* {data?.videoConsulition ? (
                <HStack>
                  <VideoCameraIcon />
                  {t("Video consultations available")}
                </HStack>
              ) : null} */}
            </div>
            <div className="text-lg flex flex-col gap-2">
              {data?.cancelable ? (
                <ServiceRulesDisplay
                  payment={data?.payment_methods[0]}
                  refundable={data?.cancelable}
                />
              ) : null}
              {data?.type === ServiceType.Vehicle ? (
                <ServiceTransportDisplay
                  airCondition={data?.airCondition!}
                  luggageCapacity={data?.lugaggeCapacity!}
                  seats={data?.seats!}
                  guests={data?.seats!}
                  passengers={data?.seats!}
                  typeOfDevice={"Mobile"}
                  type="manual"
                />
              ) : null}
              {data?.measurements ? (
                <ServicePropertyDetailsDisplay
                  size={data?.measurements}
                  residentsCapacity={{
                    max: data?.beds! + 1,
                    residentType:
                      data?.adaptedFor?.[0] === ServiceAdaptation.Children
                        ? "children"
                        : "adults",
                  }}
                />
              ) : null}
            </div>
            <div>
              {data?.includedServices && (
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(data.includedServices)
                    ? data.includedServices.map((service, i) => (
                        <span className="rounded-lg border-2 border-green-500 px-2 py-1 text-green-500 ">
                          {service} included
                        </span>
                      ))
                    : null}
                </div>
              )}
            </div>

            {event && (
              <div className="flex w-full flex-col gap-2 p-2 shadow">
                <div className="flex items-center justify-between">
                  <div className="font-bold">
                    <span>{getTimeInAmPm(new Date(event.from))}</span> -{" "}
                    <span>{getTimeInAmPm(new Date(event.to))}</span>
                  </div>
                  <CloseIcon onClick={() => handleCancelBookedEvent()} />
                </div>
                <div className="">{event.name}</div>
              </div>
            )}
            {range ? (
              <div className="grid grid-cols-2 w-full my-4 uppercase">
                <p className="flex flex-col gap-2 p-2 border-[1px] border-black rounded-tl-lg border-opacity-50">
                  <span className="font-bold">{t("check-in")}</span>{" "}
                  {new Date(range.from).toLocaleDateString("en-us", {
                    month: "2-digit",
                    year: "numeric",
                    day: "2-digit",
                  })}
                </p>
                <p className="flex flex-col gap-2 p-2 border-[1px] border-black rounded-tr-lg  border-opacity-50">
                  <span className="font-bold">{t("check-out")}</span>{" "}
                  {new Date(range.to).toLocaleDateString("en-us", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex w-full cursor-pointer">
            <div className="flex w-full gap-2">
              <BookingEventPopup
                onSuccess={(event) => handleOnSuccess(event)}
              />
              <Button
                onClick={() =>
                  data.type === ServiceType.HolidayRentals ||
                  ServiceType.BeautyCenter ||
                  ServiceType.HealthCenter ||
                  ServiceType.Restaurant
                    ? openBookEvent()
                    : data.type === ServiceType.Hotel || ServiceType.Vehicle
                      ? openBookRange()
                      : undefined
                }
                className="w-full"
              >
                {event ? t("Update Booking") : t("Book Now")}
              </Button>
              <WishListIcon onClick={handleAddToWishList} />
            </div>
            {/* <WishListIcon /> */}
          </div>
        </div>
      ) : null}
    </SpinnerFallback>
  );
};
