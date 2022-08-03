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
            <p className="font-bold">
              {rate}/{5}
            </p>{" "}
            <RateTextPresentation rate={rate} />
            {`(${reviews} ${t("reviews")})`}
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
          <ul className="list-inside list-disc flex flex-col gap-2">
            {Array.isArray(bookedMenus)
              ? bookedMenus.map((menu, i) => (
                  <div className="flex gap-2">
                    <p className="list-item">
                      {menu.title}{" "}
                      <span className="font-semibold whitespace-nowrap">
                        x {menu.qty}
                      </span>
                    </p>
                    <span className="flex gap-1 whitespace-nowrap items-start font-bold">
                      <PriceDisplay priceObject={{ amount: menu.price }} /> x{" "}
                      {menu.qty}
                    </span>
                  </div>
                ))
              : null}
          </ul>
        </div>

        <Divider />

        <div className="flex flex-col gap-1">
          <span className="flex gap-2">
            <span className="font-semibold">{t("From")}: </span>
            <p>
              {fromDate.am_pm_hour_minute} {fromDate.weekDay_short},{" "}
              {fromDate.day} {fromDate.month_short}
            </p>
          </span>
          <span className="flex gap-2">
            <span className="font-semibold">{t("To")}: </span>
            <p>
              {toDate.am_pm_hour_minute} {toDate.weekDay_short}, {toDate.day}{" "}
              {toDate.month_short}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};
