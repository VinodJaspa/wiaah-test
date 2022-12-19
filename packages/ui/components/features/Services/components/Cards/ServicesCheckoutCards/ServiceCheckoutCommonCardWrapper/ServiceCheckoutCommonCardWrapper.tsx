import { CommonServiceCheckoutData } from "api";
import { useDateDiff } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { DateDetails, setTestid } from "utils";
import {
  AspectRatioImage,
  CashbackBadge,
  ServiceRefundableTypeDescription,
  ExclamationCircleIcon,
  Divider,
  TimeRangeDisplay,
  ServiceTripDateInput,
} from "@UI";

export interface ServiceCheckoutCommonCardWrapperProps
  extends CommonServiceCheckoutData {
  horizontal?: boolean;
}

export const ServiceCheckoutCommonCardWrapper: React.FC<
  ServiceCheckoutCommonCardWrapperProps
> = ({
  bookedDates,
  cashback,
  rate,
  rateReason,
  refundingRule,
  reviews,
  thumbnail,
  title,
  children,
  duration,
  guests,
  horizontal,
}) => {
  const { t } = useTranslation();
  const fromDate = DateDetails(bookedDates.from);
  const toDate = DateDetails(bookedDates.to || "");
  const { days } = useDateDiff({
    from: new Date(bookedDates.from),
    to: new Date(bookedDates.to || ""),
  });

  return (
    <div className={`flex ${horizontal ? "flex-row" : "flex-col"}`}>
      <div className={`${horizontal ? "min-w-[20rem]" : "w-full"}`}>
        <AspectRatioImage
          src={thumbnail}
          alt={title}
          ratio={horizontal ? 6 / 5 : 1 / 2}
        >
          <div className="bg-black bg-opacity-20 absolute top-0 left-0 right-0 bottom-0 pointer-events-none"></div>
          <span className="absolute w-full flex justify-between items-end bottom-4 px-4">
            <p className="font-bold text-white">{title}</p>
            <CashbackBadge props={{ className: "h-fit" }} {...cashback} />
          </span>
        </AspectRatioImage>
      </div>
      <div
        className={`flex ${
          horizontal ? "grid grid-cols-2" : "flex-col"
        } gap-4 p-2`}
      >
        <div className="flex flex-col">
          <span className="flex gap-1">
            <p>{`${reviews} ${t("reviews")}`}</p>
            <p className="font-bold">
              {"("}
              {rate}/{5}
              {")"}
            </p>{" "}
          </span>
          <p>{`${t("Guests rated this property")} ${rate}/${5} ${t(
            "for"
          )} ${rateReason}`}</p>
        </div>
        <span className={`text-red-500 font-semibold flex gap-2 items-center`}>
          <ServiceRefundableTypeDescription
            {...refundingRule}
            bookedDate={new Date()}
          />
          <ExclamationCircleIcon />
        </span>
        {guests ? (
          <div className="flex items-center gap-2">
            <p className="font-semibold">{t("Guests")}:</p>
            <p>{guests}</p>
          </div>
        ) : null}
        {children}

        {fromDate && !toDate ? (
          <div className="flex flex-col gap-1">
            <span className="flex gap-2">
              <span className="font-semibold">{t("At")}:</span>
              {fromDate ? (
                <p>
                  {fromDate.month_short}, {fromDate.day}{" "}
                  {fromDate.am_pm_hour_minute}
                </p>
              ) : null}
            </span>
            {duration ? (
              <span {...setTestid("ServiceDuration")} className="flex gap-2">
                <span className="font-semibold">{t("Duration")}:</span>
                <p>
                  <TimeRangeDisplay rangeInMinutes={duration} />
                </p>
              </span>
            ) : null}
          </div>
        ) : fromDate && toDate ? (
          <div className="flex flex-col gap-1">
            <span className="flex gap-2">
              <span className="font-semibold">{t("Check-in")}:</span>
              {fromDate ? (
                <p>
                  {fromDate.weekDay_short}, {fromDate.day}{" "}
                  {fromDate.month_short}
                </p>
              ) : null}
            </span>
            <span className="flex gap-2">
              <span className="font-semibold">{t("Check-out")}:</span>

              {toDate ? (
                <p>
                  {toDate.weekDay_short}, {toDate.day} {toDate.month_short}
                </p>
              ) : null}
            </span>
            <p>
              {days}-{t("night stay")}
            </p>
          </div>
        ) : null}
        <ServiceTripDateInput />
      </div>
    </div>
  );
};
