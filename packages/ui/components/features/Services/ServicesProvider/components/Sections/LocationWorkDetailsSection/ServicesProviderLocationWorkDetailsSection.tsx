import React, { LegacyRef } from "react";
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
  HotelRoomDetailsCard,
  Slider,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "ui";
import { useTranslation } from "react-i18next";
import { ArrElement, HtmlDivProps } from "types";
import { useSetSectionRef, usePublishRef } from "state";

export interface ServicesProviderLocationWorkDetailsSectionProps
  extends ServicesProviderLocationWorkData {}

export const ServicesProviderLocationWorkDetailsSection: React.FC<
  ServicesProviderLocationWorkDetailsSectionProps
> = ({ location, telephone, workingDays, email, policies, rooms }) => {
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

  const mapRef = usePublishRef("map");

  const contactRef = usePublishRef("contact");

  const roomsRef = usePublishRef("rooms");

  const workingHoursRef = usePublishRef("workingHours");

  const policiesRef = usePublishRef("policies");

  return (
    <div className="flex flex-col gap-8 w-full">
      <Accordion defaultOpenItems={[...Array(10)].map((_, i) => `${i + 1}`)}>
        <AccordionItem itemkey={"1"}>
          <AccordionButton>
            <p ref={contactRef ?? undefined}>{t("Address")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4 flex gap-2 items-center">
            <LocationIcon />
            <div className="underline font-bold">
              <p>{location.address}</p>
              <p>
                {location.postalCode} {location.city}
              </p>
              <p>{location.country}</p>
            </div>
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
        <AccordionItem itemkey={"7"}>
          <AccordionButton>
            <p ref={roomsRef ?? undefined}>{t("Rooms")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4 flex gap-2 w-full items-center">
            <Slider
              gap={16}
              leftArrowComponent={() => (
                <div className="bg-black bg-opacity-50 text-primary p-1  rounded-full text-3xl">
                  <ArrowLeftIcon />
                </div>
              )}
              rightArrowComponent={() => (
                <div className="bg-black bg-opacity-50 text-primary p-1  rounded-full text-3xl">
                  <ArrowRightIcon />
                </div>
              )}
              itemsCount={3}
            >
              {Array.isArray(rooms)
                ? rooms.map((room) => <HotelRoomDetailsCard {...room} />)
                : null}
            </Slider>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem itemkey={"4"}>
          <AccordionButton>
            <p ref={workingHoursRef ?? undefined}>{t("Working hours")}</p>
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
        <AccordionItem itemkey={"6"}>
          <AccordionButton>
            <p ref={policiesRef ?? undefined}>{t("Policies")}</p>
          </AccordionButton>
          <AccordionPanel className="py-4 flex flex-col gap-8">
            <ul className="font-bold">
              <p>{t("Message for clients")}</p>
              <li>
                <p className="font-normal">
                  {policies.messageForClients || ""}
                </p>
              </li>
            </ul>
            <ul>
              <p className="font-bold">{t("Checkin - Checkout terms")}</p>
              {policies && Array.isArray(policies.checkin_checkout_terms)
                ? policies.checkin_checkout_terms.map((term, i) => (
                    <li className="">
                      <p key={i}>- {term}</p>
                    </li>
                  ))
                : null}
            </ul>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem itemkey={"5"}>
          <AccordionButton>
            <p ref={mapRef ?? undefined}>{t("Show on map")}</p>
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
