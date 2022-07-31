import React from "react";
import {
  HotelRoomDataType,
  ServiceLocation,
  ServicePoliciesType,
  ServiceReachOutType,
  ServiceWorkingDays,
} from "api";
import {
  HStack,
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
import { ArrElement } from "types";
import { usePublishRef, useSetBookedServicesState } from "state";
import { useResponsive } from "hooks";

export interface HotelServiceRoomsSectionProps {
  rooms: HotelRoomDataType[];
}
export const HotelServiceRoomsSection: React.FC<
  HotelServiceRoomsSectionProps
> = ({ rooms }) => {
  const { addService } = useSetBookedServicesState();
  const { isMobile, isTablet } = useResponsive();
  const { t } = useTranslation();
  const roomsRef = usePublishRef((refs) => refs.rooms);

  function handleBook(id: string) {
    const room = rooms.find((room) => room.id === id);
    if (!room) return;
    addService({
      id: room.id,
      name: room.title,
      price: room.price,
      qty: 1,
    });
  }
  return (
    <div className=" flex gap-2 flex-col">
      <p ref={roomsRef ?? undefined}>{t("Rooms")}</p>
      <Slider
        gap={16}
        leftArrowComponent={CaruoselLeftArrow}
        rightArrowComponent={CaruoselRightArrow}
        itemsCount={isMobile ? 1 : isTablet ? 2 : 3}
      >
        {Array.isArray(rooms)
          ? rooms.map((room) => (
              <HotelRoomDetailsCard onBook={handleBook} {...room} />
            ))
          : null}
      </Slider>
    </div>
  );
};

export const CaruoselLeftArrow: React.FC = () => (
  <div className="bg-black bg-opacity-50 text-primary p-1  rounded-full text-3xl">
    <ArrowLeftIcon />
  </div>
);

export const CaruoselRightArrow: React.FC = () => (
  <div className="bg-black bg-opacity-50 text-primary p-1  rounded-full text-3xl">
    <ArrowRightIcon />
  </div>
);

export interface ServiceOnMapLocationSectionProps extends ServiceLocation {}

export const ServiceOnMapLocationSection: React.FC<
  ServiceOnMapLocationSectionProps
> = ({ location }) => {
  const { t } = useTranslation();
  const mapRef = usePublishRef("map");
  const localizationRef = usePublishRef("localization");
  return (
    <div ref={localizationRef} className="flex flex-col gap-4">
      <p className="font-bold text-lg">{t("Localization")}</p>
      <p ref={mapRef ?? undefined}>{t("Show on map")}</p>
      <HStack>
        <AspectRatio ratio={3 / 6}>
          <WrappedMap
            className="w-full h-full"
            center={location.cords}
            zoom={12}
          >
            <Marker position={location.cords} />
          </WrappedMap>
        </AspectRatio>
      </HStack>
    </div>
  );
};

export interface ServiceWorkingHoursSectionProps extends ServiceWorkingDays {}

export const ServiceWorkingHoursSection: React.FC<
  ServiceWorkingHoursSectionProps
> = ({ workingDays }) => {
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

  const workingHoursRef = usePublishRef("workingHours");
  return (
    <>
      <p ref={workingHoursRef ?? undefined}>{t("Working hours")}</p>
      <div>
        {workingDays.map((day, i) => (
          <div
            key={i}
            className={`flex justify-between rounded border-t-[1px] border-x-[1px] py-2`}
          >
            <p className="font-bold">{t(day.weekDay)}</p>
            <p className="whitespace-nowrap">
              {checkIsWorkingDay(day)
                ? `${day.from.hour}H${day.from.minutes} - ${day.to.hour}H${day.to.minutes}`
                : t("closed")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export interface ServicePoliciesSectionProps extends ServicePoliciesType {}

export const ServicePoliciesSection: React.FC<ServicePoliciesSectionProps> = ({
  policies,
}) => {
  const { t } = useTranslation();
  const policiesRef = usePublishRef("policies");
  return (
    <>
      <p className="text-lg font-bold" ref={policiesRef ?? undefined}>
        {t("Policies")}
      </p>
      <div className="flex gap-2 flex-col">
        {Array.isArray(policies)
          ? policies.map((policy, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p className="font-bold">{t(policy.policyTitle)}</p>

                <div className="flex flex-col">
                  {Array.isArray(policy.policyTerms)
                    ? policy.policyTerms.map((term, i) => (
                        <p className="font-semibold" key={i}>
                          - {term}
                        </p>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}

        {/* <ul className="font-bold">
          <p>{t("Message for clients")}</p>
          <li>
            <p className="font-normal">{policies.messageForClients || ""}</p>
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
        </ul> */}
      </div>
    </>
  );
};

export interface ServiceReachOutSectionProps extends ServiceReachOutType {}
export const ServiceReachOutSection: React.FC<ServiceReachOutSectionProps> = ({
  email,
  location,
  telephone,
}) => {
  const { t } = useTranslation();
  const contactRef = usePublishRef("contact");
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-lg">{t("Contact")}</p>
      <p ref={contactRef ?? undefined}>{t("Address")}</p>
      <HStack>
        <LocationIcon />
        <div className="underline font-bold">
          <p>{location.address}</p>
          <p>
            {location.postalCode} {location.city}
          </p>
          <p>{location.country}</p>
        </div>
      </HStack>
      <p>{t("Telephone")}</p>
      <HStack>
        <TelephoneIcon />
        <p className="underline font-bold">{telephone}</p>
      </HStack>
      <p>{t("Email")}</p>
      <HStack>
        <EmailIcon />
        <p className="underline font-bold">{email}</p>
      </HStack>
    </div>
  );
};
