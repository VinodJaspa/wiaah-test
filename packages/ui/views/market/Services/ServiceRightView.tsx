import React from "react";
import {
  BookingEventPopup,
  CloseIcon,
  Spacer,
  WishListIcon,
  useCartSummary,
  Button,
  Rate,
  SpinnerFallback,
  ModalExtendedWrapper,
  ModalButton,
  ServiceRulesDisplay,
  ServiceTransportDisplay,
  ServicePropertyDetailsDisplay,
} from "ui";
import { Event } from "ui";
import { useGetServiceDataQuery } from "ui";
import { getTimeInAmPm } from "utils";
import { useTranslation } from "react-i18next";
import { useServiceBookedRange } from "state";

export interface ServiceRightViewProps {
  serviceId: string;
}

export const ServiceRightView: React.FC<ServiceRightViewProps> = ({
  serviceId,
}) => {
  const { range } = useServiceBookedRange();
  const { data, isLoading, isError } = useGetServiceDataQuery(serviceId);

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
        <div className="flex h-full flex-col justify-between">
          <div className="flex h-full flex-col items-start">
            <samp className="green-text">{data.category}</samp>
            <h1 className="m-0 text-2xl font-bold text-gray-800 ">
              {data.name}
            </h1>
            <div className="flex items-center">
              <div className="inline-flex items-center">
                <Rate
                  allowHalf
                  rating={data.rating}
                  className="text-orange-500"
                />
              </div>
              <div className="mx-3 h-5 w-px bg-gray-300"></div>
              <span className="text-gray-500">
                {data.reviews} {t("Reviews", "Reviews")}
              </span>
            </div>
            <div className="mt-2 flex items-center font-bold">
              <span className="product-price text-3xl">
                ${data.price.value}
                100
              </span>
              {/* {!data?.price?.value ? (
                ""
              ) : ( */}
              <span className="product-old-price ml-5 text-2xl text-slate-400 line-through">
                ${data?.price.value}
                110
              </span>
              {/* )} */}
            </div>
            <div className="my-2 inline-block rounded-md bg-red-400 px-4 py-1 font-bold text-white">
              <span>{data?.discount?.discount?.value}% </span>
              <span>{t("OFF", "OFF")}</span>
            </div>
            <div>
              {data?.discount?.discountedUnits && (
                <div className="text-lg font-bold text-red-500">
                  {t("Only", "Only")} {data.discount.discountedUnits}{" "}
                  {t("Tickets left at this price on our site")}
                </div>
              )}
            </div>
            <div className="mb-2 text-lg">
              <div>
                <span className="font-bold">
                  {data?.available
                    ? t("Service Available") + ":" + data.available
                    : t("Service Not Available")}{" "}
                </span>
              </div>
              <div className=" text-red-500">
                {data?.shippedToYourCountry
                  ? t("Service available for international customers")
                  : ""}
              </div>
            </div>
            <div className="text-lg flex flex-col gap-2 my-2">
              {data?.serviceRules ? (
                <ServiceRulesDisplay {...data.serviceRules} />
              ) : null}
              {data?.serviceTransport ? (
                <ServiceTransportDisplay {...data.serviceTransport} />
              ) : null}
              {data?.propertyDetails ? (
                <ServicePropertyDetailsDisplay {...data.propertyDetails} />
              ) : null}
            </div>
            <div>
              {data?.included && (
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(data.included)
                    ? data.included.map((service, i) => (
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
          <Spacer />
          <div className="flex w-full cursor-pointer">
            <div className="flex w-full gap-2">
              <ModalExtendedWrapper>
                <BookingEventPopup
                  varaint={
                    data.type === "event"
                      ? "event"
                      : data.type === "rent"
                      ? "rent"
                      : undefined
                  }
                  onSuccess={(event) => handleOnSuccess(event)}
                />
                <ModalButton>
                  <Button className="w-full">
                    {event ? t("Update Booking") : t("Book Now")}
                  </Button>
                </ModalButton>
              </ModalExtendedWrapper>
              <WishListIcon onClick={handleAddToWishList} />
            </div>
            {/* <WishListIcon /> */}
          </div>
        </div>
      ) : null}
    </SpinnerFallback>
  );
};
