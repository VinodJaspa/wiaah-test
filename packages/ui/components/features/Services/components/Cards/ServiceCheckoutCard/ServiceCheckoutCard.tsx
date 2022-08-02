import { ServiceCheckoutBookedPropertyData } from "api";
import { useDateDiff } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AspectRatioImage,
  RateTextPresentation,
  ServiceRefundableTypeDescription,
  ExclamationCircle,
} from "ui";
import { DateDetails } from "utils";

export interface ServiceCheckoutCardProps
  extends ServiceCheckoutBookedPropertyData {}

export const ServiceCheckoutCard: React.FC<ServiceCheckoutCardProps> = ({
  bookedDates,
  rate,
  refundingRule,
  reviews,
  thumbnail,
  id,
  title,
  rateReason,
  extras,
}) => {
  const { t } = useTranslation();
  const checkinDate = DateDetails(bookedDates.checkin);
  const checkoutDate = DateDetails(bookedDates.checkout);
  const { days } = useDateDiff({
    from: new Date(bookedDates.checkin),
    to: new Date(bookedDates.checkout),
  });

  return (
    <div className="flex flex-col">
      <AspectRatioImage src={thumbnail} alt={title} ratio={1 / 2}>
        <div className="bg-black bg-opacity-20 absolute top-0 left-0 right-0 bottom-0 pointer-events-none"></div>
        <p className="absolute bottom-4 left-4 font-bold text-white">{title}</p>
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
          <ExclamationCircle />
        </span>

        <div className="flex flex-wrap gap-2">
          <p className="font-semibold">{t("Extras")}:</p>
          {extras.map((extra, i) => (
            <p key={i}>{extra}</p>
          ))}
        </div>

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
