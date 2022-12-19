import { BeautyCenterCheckoutBookedPropertyData } from "api";
import React from "react";
import {
  ServiceCheckoutCommonCardWrapper,
  TimeRangeDisplay,
  PriceDisplay,
} from "@UI";
import { setTestid } from "utils";

export interface BeautyCenterCheckoutCardProps
  extends BeautyCenterCheckoutBookedPropertyData {}

export const BeautyCenterCheckoutCard: React.FC<
  BeautyCenterCheckoutCardProps
> = ({ children, ...props }) => {
  const { bookedTreatments } = props;
  return (
    <ServiceCheckoutCommonCardWrapper {...props}>
      <ul className="list-disc list-inside">
        {Array.isArray(bookedTreatments)
          ? bookedTreatments.map((treatment, i) => (
              <li
                {...setTestid("BookedTreatmentItem")}
                className="flex justify-between w-full"
              >
                <div>
                  <p className="list-item">{treatment.title}</p>
                  <TimeRangeDisplay
                    rangeInMinutes={treatment.durationInMinutes}
                  />
                </div>
                <PriceDisplay className="font-bold" price={treatment.price} />
              </li>
            ))
          : null}
      </ul>
    </ServiceCheckoutCommonCardWrapper>
  );
};
