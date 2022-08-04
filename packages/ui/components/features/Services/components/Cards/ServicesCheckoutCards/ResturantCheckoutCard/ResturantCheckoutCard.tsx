import { RestaurantCheckoutBookedPropertyData } from "api";
import { useDateDiff } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { DateDetails } from "utils";
import {
  AspectRatioImage,
  CashbackBadge,
  RateTextPresentation,
  ServiceRefundableTypeDescription,
  ExclamationCircleIcon,
  PriceDisplay,
  Divider,
  TimeRangeDisplay,
} from "ui";

export interface ResturantCheckoutCardProps
  extends RestaurantCheckoutBookedPropertyData {}

export const ResturantCheckoutCard: React.FC<ResturantCheckoutCardProps> = ({
  bookedDates,
  bookedMenus,
  cashback,
  guests,
  id,
  price,
  rate,
  rateReason,
  refundingRule,
  reviews,
  serviceType,
  thumbnail,
  title,
  duration,
}) => {
  const { t } = useTranslation();
  const fromDate = DateDetails(bookedDates.from);
  const toDate = DateDetails(bookedDates.to);

  return (
    <div className="flex flex-col">
      <AspectRatioImage src={thumbnail} alt={title} ratio={1 / 2}>
        <div className="bg-black bg-opacity-20 absolute top-0 left-0 right-0 bottom-0 pointer-events-none"></div>
        <span className="absolute w-full flex justify-between items-end bottom-4 px-4">
          <p className="font-bold text-white">{title}</p>
          <CashbackBadge props={{ className: "h-fit" }} {...cashback} />
        </span>
      </AspectRatioImage>
      <div className="flex flex-col gap-4 p-2">
        <div className="flex flex-col">
          <span className="flex gap-1">
            {`${reviews} ${t("reviews")}`}
            <p className="font-bold">
              {"("}
              {rate}/{5}
              {")"}
            </p>{" "}
          </span>
          <p>{`Guests rated this property ${rate}/${5} for ${rateReason}`}</p>
        </div>
        <span className="text-red-500 font-semibold flex gap-2 items-center">
          <ServiceRefundableTypeDescription
            {...refundingRule}
            bookedDate={new Date()}
          />
          <ExclamationCircleIcon />
        </span>

        <div className="flex items-center gap-2">
          <p className="font-semibold">{t("Guests")}:</p>
          <p>{guests}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">{t("Booked menus")}:</p>
          <ul className="flex flex-col gap-2">
            {Array.isArray(bookedMenus)
              ? bookedMenus.map((menu, i) => (
                  <li
                    className={`flex justify-between gap-2 items-center py-4 ${
                      i < bookedMenus.length - 1
                        ? "border-b border-b-gray-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold">
                        {menu.qty}x
                      </span>
                      <p className="font-semibold">{menu.title}</p>
                    </div>
                    <PriceDisplay
                      className="font-bold"
                      priceObject={{ amount: menu.price }}
                    />
                  </li>
                ))
              : null}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <span className="flex gap-2">
            <span className="font-semibold">{t("At")}: </span>
            <p>
              {fromDate.month_short}, {fromDate.day}{" "}
              {fromDate.am_pm_hour_minute}
            </p>
          </span>
          {/* {duration ? (
            <span className="flex gap-2">
              <span className="font-semibold">{t("Duration")}: </span>
              <p>
                <TimeRangeDisplay rangeInMinutes={duration} />
              </p>
            </span>
          ) : null} */}
        </div>
        <Divider />
      </div>
    </div>
  );
};
