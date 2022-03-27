import React from "react";
import { Rate } from "antd";
import { t } from "i18next";
import {
  Button,
  BookingEventPopup,
  CloseIcon,
  Spacer,
  FlexStack,
  WishListIcon,
  useCartSummary,
} from "ui";
import { Event } from "ui/components/blocks/ServiceBookingCalander";
import { BookingEventRefProps } from "ui/components/blocks/BookingEventPopup";
import { getTimeInAmPm } from "ui/components/helpers/getTimeInAmPm";

export interface ProductProps {
  id?: string;
  name?: string;
  price: number;
  oldPrice?: number;
  imgUrl?: string;
  rating?: number;
  off?: number;
  reviews?: number;
  category?: string;
  saved?: boolean;
  available?: number;
  cashBack?: string;
  shippedToYourCountry?: boolean;
  discontUnits?: number;
  included?: string[];
}

export const ServiceRightView: React.FC<ProductProps> = ({
  name = "",
  price,
  oldPrice,
  rating = 0,
  shippedToYourCountry = true,
  available,
  off = "",
  category = "",
  reviews = 0,
  discontUnits,
  included,
}) => {
  const bookEventPopupRef = React.useRef<BookingEventRefProps>(null);
  const { AddNewItem } = useCartSummary();
  const [event, setEvent] = React.useState<Event>();

  function handleCancelBookedEvent() {
    setEvent(undefined);
  }

  function handleOpenBookEvent() {
    if (bookEventPopupRef.current) {
      bookEventPopupRef.current.openServiceBooking();
    }
  }

  function handleCloseBookEvent() {
    if (bookEventPopupRef.current) {
      bookEventPopupRef.current.closeServiceBooking();
    }
  }

  function handleOnSuccess(event: Event) {
    setEvent(event);
    handleCloseBookEvent();
  }
  function handleAddToWishList() {
    // add to wishList
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col items-start">
        <BookingEventPopup
          ref={bookEventPopupRef}
          onSuccess={(event) => handleOnSuccess(event)}
        />
        <samp className="green-text">{category}</samp>
        <h1 className="m-0 text-2xl font-bold text-gray-800 ">{name}</h1>
        <div className="flex items-center">
          <div className="inline-flex items-center">
            <Rate allowHalf value={rating} className="text-orange-500" />
          </div>
          <div className="mx-3 h-5 w-px bg-gray-300"></div>
          <span className="text-gray-500">
            {reviews} {t("Reviews", "Reviews")}
          </span>
        </div>
        <div className="mt-2 flex items-center font-bold">
          <span className="product-price text-3xl">${price}</span>
          {!oldPrice ? (
            ""
          ) : (
            <span className="product-old-price ml-5 text-2xl text-slate-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>
        <div className="my-2 inline-block rounded-md bg-red-400 px-4 py-1 font-bold text-white">
          <span>{off}% </span>
          <span>{t("OFF", "OFF")}</span>
        </div>
        <div>
          {discontUnits && (
            <div className="text-lg font-bold text-red-500">
              {t("Only", "Only")} {discontUnits}{" "}
              {t(
                "Discount_Units_Left",
                "Tickets left at this price on our site"
              )}
            </div>
          )}
        </div>
        <div className="mb-2 text-lg">
          <div>
            <span className="font-bold">
              {available
                ? t("Service_Available", "Service Available") + ":" + available
                : t("Service_Not_Available", "Service Not Available")}{" "}
            </span>
          </div>
          <div className=" text-red-500">
            {shippedToYourCountry
              ? t(
                  "Service_available_for_international_customers",
                  "Service available for international customers"
                )
              : ""}
          </div>
        </div>
        <div>
          {included && (
            <div className="flex flex-wrap gap-2">
              {included.map((service, i) => (
                <span className="rounded-lg border-2 border-green-500 px-2 py-1 text-green-500 ">
                  {service} included
                </span>
              ))}
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
      </div>
      <Spacer />
      <div className="flex w-full cursor-pointer">
        <FlexStack fullWidth={true} horizontalSpacingInRem={0.5}>
          <Button onClick={() => handleOpenBookEvent()}>
            {event
              ? t("Update_Booking", "Update Booking")
              : t("Book_Now", "Book Now")}
          </Button>
          <WishListIcon onClick={handleAddToWishList} />
        </FlexStack>
        {/* <WishListIcon /> */}
      </div>
    </div>
  );
};
