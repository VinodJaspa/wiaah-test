import { BeautyCenterCheckoutBookedPropertyData } from "api";
import React from "react";
import {
  ServiceCheckoutCommonCardWrapper,
  TimeRangeDisplay,
  PriceDisplay,
} from "ui";

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
              <li className="flex justify-between w-full">
                <div>
                  <p className="list-item">{treatment.title}</p>
                  <TimeRangeDisplay
                    rangeInMinutes={treatment.durationInMinutes}
                  />
                </div>
                <PriceDisplay
                  className="font-bold"
                  priceObject={{ amount: treatment.price }}
                />
              </li>
            ))
          : null}
      </ul>
    </ServiceCheckoutCommonCardWrapper>
  );
};
