import { CommonServiceCheckoutData } from "api";
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
  Divider,
  TimeRangeDisplay,
} from "ui";

export interface ServiceCheckoutCommonCardWrapperProps
  extends CommonServiceCheckoutData {}

export const ServiceCheckoutCommonCardWrapper: React.FC<
  ServiceCheckoutCommonCardWrapperProps
> = ({
  bookedDates,
  cashback,
  id,
  price,
  rate,
  rateReason,
  refundingRule,
  reviews,
  serviceType,
  thumbnail,
  title,
  children,
  duration,
}) => {
  const { t } = useTranslation();
  const fromDate = DateDetails(bookedDates.from);
  const toDate = DateDetails(bookedDates.to);
  const { days } = useDateDiff({
    from: new Date(bookedDates.from),
    to: new Date(bookedDates.to),
  });

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
            {/* <RateTextPresentation rate={rate} /> */}
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

        {children}

        <div className="flex flex-col gap-1">
          <span className="flex gap-2">
            <span className="font-semibold">{t("At")}: </span>
            <p>
              {fromDate.month_short}, {fromDate.day}{" "}
              {fromDate.am_pm_hour_minute}
            </p>
          </span>

          {duration ? (
            <span className="flex gap-2">
              <span className="font-semibold">{t("Duration")}: </span>
              <p>
                <TimeRangeDisplay rangeInMinutes={duration} />
              </p>
            </span>
          ) : null}
        </div>
        <Divider />
      </div>
    </div>
  );
};
