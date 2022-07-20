import React from "react";
import { ServicesProviderLocationWorkData } from "api";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  WrappedMap,
  Marker,
  AspectRatio,
  EmailIcon,
  TelephoneIcon,
  LocationIcon,
} from "ui";
import { useTranslation } from "react-i18next";
import { ArrElement } from "types";

export interface ServicesProviderLocationWorkDetailsSectionProps
  extends ServicesProviderLocationWorkData {
  ref?: React.RefObject<HTMLDivElement>;
  mapRef?: React.RefObject<HTMLDivElement>;
}

export const ServicesProviderLocationWorkDetailsSection: React.FC<
  ServicesProviderLocationWorkDetailsSectionProps
> = ({ location, telephone, workingDays, email, ref, mapRef }) => {
  const { t } = useTranslation();

  const checkIsWorkingDay = React.useCallback(
    (day: ArrElement<typeof workingDays>) => {
      if (
        day.from.hour === 0 &&
        day.from.minutes === 0 &&
        day.to.hour === 0 &&
        day.to.minutes === 0
      )
        return false;
      return true;
    },
    []
  );
  return (
    <div className="flex flex-col gap-8 w-full">
      <Accordion defaultOpenItems={[...Array(5)].map((_, i) => `${i + 1}`)}>
        <AccordionItem itemkey={"1"}>
          <AccordionButton>
            <p>{t("Address")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4 flex gap-2 items-center">
            <LocationIcon />
            <p className="underline font-bold">
              {location.address} / {location.postalCode} {location.city} /{" "}
              {location.country}
            </p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem itemkey={"2"}>
          <AccordionButton>
            <p>{t("Telephone")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4 flex gap-2 items-center">
            <TelephoneIcon />
            <p className="underline font-bold">{telephone}</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem itemkey={"3"}>
          <AccordionButton>
            <p>{t("Email")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4 flex gap-2 items-center">
            <EmailIcon />
            <p className="underline font-bold">{email}</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem itemkey={"4"}>
          <AccordionButton>
            <p>{t("Working hours")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4">
            {workingDays.map((day, i) => (
              <div
                key={i}
                className={`flex justify-between rounded border-t-[1px] border-x-[1px] p-2`}
              >
                <p className="font-bold">{t(day.weekDay)}</p>
                <p className="whitespace-nowrap">
                  {checkIsWorkingDay(day)
                    ? `${day.from.hour}H${day.from.minutes} - ${day.to.hour}H${day.to.minutes}`
                    : t("closed")}
                </p>
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem ref={mapRef ?? undefined} itemkey={"5"}>
          <AccordionButton>
            <p>{t("Show on map")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4 w-full">
            <AspectRatio ratio={3 / 6}>
              <WrappedMap
                className="w-full h-full"
                center={location.cords}
                zoom={12}
              >
                <Marker position={location.cords} />
              </WrappedMap>
            </AspectRatio>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
