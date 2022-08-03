import { HotelCheckoutBookedPropertyData } from "api";
import { useDateDiff } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AspectRatioImage,
  RateTextPresentation,
  ServiceRefundableTypeDescription,
  ExclamationCircleIcon,
  CashbackBadge,
  Divider,
} from "ui";
import { DateDetails } from "utils";

export interface HotelCheckoutCardProps
  extends HotelCheckoutBookedPropertyData {}

export const HotelCheckoutCard: React.FC<HotelCheckoutCardProps> = ({
  bookedDates,
  rate,
  refundingRule,
  reviews,
  thumbnail,
  id,
  title,
  rateReason,
  extras,
  guests,
  cashback,
  price,
}) => {
  const { t } = useTranslation();
  const checkinDate = DateDetails(bookedDates.from);
  const checkoutDate = DateDetails(bookedDates.to);
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

        <div className="flex flex-wrap gap-2">
          <p className="font-semibold">{t("Extras")}:</p>
          {Array.isArray(extras)
            ? extras.map((extra, i) => <p key={i}>{extra}</p>)
            : null}
        </div>
        <Divider />
        <div className="flex flex-col gap-1">
          <span className="flex gap-2">
            <span className="font-semibold">{t("Check-in")}: </span>
            <p>
              {checkinDate.weekDay_short}, {checkinDate.day}{" "}
              {checkinDate.month_short}
            </p>
          </span>
          <span className="flex gap-2">
            <span className="font-semibold">{t("Check-out")}: </span>
            <p>
              {checkoutDate.weekDay_short}, {checkoutDate.day}{" "}
              {checkoutDate.month_short}
            </p>
          </span>
          <p>
            {days}-{t("night stay")}
          </p>
        </div>
      </div>
    </div>
  );
};
