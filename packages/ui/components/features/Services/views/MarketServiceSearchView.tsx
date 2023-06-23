import {
  LocationSearchInput,
  ResturantSearchInput,
  WorkingDaysCalender,
  usePaginationControls,
} from "@blocks";
import { ServiceType } from "@features/API";
import { useResponsive } from "hooks";
import React from "react";
import { useRouting } from "routing";
import {
  AirConditionIcon,
  ArrowRightIcon,
  AspectRatioImage,
  Avatar,
  Button,
  CarWindowIcon,
  DotIcon,
  GPSIcon,
  HStack,
  HeartFillIcon,
  HeartOutlineAltIcon,
  Input,
  InputGroup,
  InputLeftElement,
  LocationIcon,
  LocationOutlineIcon,
  MapIcon,
  Pagination,
  PersonGroupIcon,
  PriceDisplay,
  SearchIcon,
  StarIcon,
  TransportLuggageIcon,
  Verified,
} from "@partials";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { useGetFilteredServicesQuery } from "../Services";
import { ServicesRequestKeys } from "../constants";
import { HealthCenterSearchBox } from "../HealthCenter";
import { VehicleSearchBox } from "../Vehicle";

export const MarketServiceSearchView: React.FC<{
  serviceType: ServiceType;
}> = ({ serviceType }) => {
  const { visit } = useRouting();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  const { controls, pagination } = usePaginationControls();

  const { data: services } = useGetFilteredServicesQuery({
    pagination,
    filters: [],
  });

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <div className="flex flex-col gap-4">
      {/* search bar */}

      {isMobile ? (
        <>
          {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
            <HStack>
              <InputGroup className="w-full">
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
                <Input />
              </InputGroup>
              <Button>{t("Submit")}</Button>
            </HStack>
          ) : null}
        </>
      ) : (
        <>
          {showOn([
            ServiceType.Hotel,
            ServiceType.HolidayRentals,
            ServiceType.BeautyCenter,
          ]) ? (
            <LocationSearchInput
              onLocationSelect={(location) => {
                visit((routes) =>
                  routes.visitServiceLocationSearchResults(
                    serviceType,
                    location
                  )
                );
              }}
            />
          ) : null}

          {showOn([ServiceType.Restaurant]) ? (
            <ResturantSearchInput
              onSubmit={() =>
                visit((routes) =>
                  routes.visitServiceLocationSearchResults(
                    ServicesRequestKeys.resturants,
                    "location"
                  )
                )
              }
            />
          ) : null}

          {showOn([ServiceType.HealthCenter]) ? (
            <HealthCenterSearchBox />
          ) : null}
          {showOn([ServiceType.Vehicle]) ? <VehicleSearchBox /> : null}
        </>
      )}

      {isMobile ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            {mapArray(
              services?.data,
              ({
                name,
                price,
                rating,
                shop,
                thumbnail,
                description,
                reviews,
                speciality,
                availableAppointments,
                healthCenterBookedAppointments,
                airCondition,
                gpsAvailable,
                lugaggeCapacity,
                seats,
                windows,
                id,
                treatmentCategory,
                saved,
              }) => (
                <>
                  {showOn([ServiceType.Hotel]) ? (
                    <MarketHotelServiceSearchCardAlt
                      description={description}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      name={name}
                      price={price}
                      rating={rating}
                      thumbnail={thumbnail}
                    />
                  ) : null}
                  {showOn([ServiceType.Restaurant]) ? (
                    <MarketRestaurantServiceSearchCardAlt
                      reviews={reviews}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      name={name}
                      price={price}
                      rating={rating}
                      thumbnail={thumbnail}
                    />
                  ) : null}

                  {showOn([ServiceType.HealthCenter]) ? (
                    <MarketHealthCenterServiceCardAlt
                      bookedAppointments={healthCenterBookedAppointments}
                      title={name}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      thumbnail={thumbnail}
                      speciality={speciality || ""}
                      appointments={availableAppointments || []}
                    />
                  ) : null}

                  {showOn([ServiceType.Vehicle]) ? (
                    <MarketVehicleServiceSearchCardAlt
                      title={name}
                      airCondition={!!airCondition}
                      gps={!!gpsAvailable}
                      thumbnail={thumbnail}
                      luggage={lugaggeCapacity || 0}
                      pricePerDay={price}
                      windows={windows || 0}
                      passengers={seats || 0}
                    />
                  ) : null}

                  {showOn([ServiceType.BeautyCenter]) ? (
                    <MarketBeautyCenterSearchCardAlt
                      title={name}
                      thumbnail={thumbnail}
                      id={id}
                      rate={rating}
                      reviews={reviews}
                      category={treatmentCategory!}
                    />
                  ) : null}

                  {showOn([ServiceType.HolidayRentals]) ? (
                    <MarketHolidayRentalsServiceSearchCardAlt
                      title={name}
                      thumbnail={thumbnail}
                      reviews={reviews}
                      description={description}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      monthlyPrice={price}
                      rating={rating}
                      saved={saved}
                      sellerName={shop.sellerProfile.username}
                      sellerThumbnail={shop.sellerProfile.photo}
                      sellerVerified={shop.sellerProfile.verified}
                    />
                  ) : null}
                </>
              )
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <Pagination controls={controls} />
    </div>
  );
};

export const MarketHotelServiceSearchCardAlt: React.FC<{
  thumbnail: string;
  name: string;
  rating: number;
  description: string;
  price: number;
  location: string;
}> = ({ description, location, name, price, rating, thumbnail }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-1">
      <AspectRatioImage
        className="rounded-xl"
        ratio={1.2}
        src={thumbnail}
        alt={name}
      >
        <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/30">
          <HeartOutlineAltIcon className="text-sm text-white fill-white" />
        </button>
      </AspectRatioImage>
      <div className="p-1 flex flex-col gap-8">
        <HStack className="justify-between">
          <p className="font-medium">{location}</p>
          <HStack className="text-xs">
            <StarIcon />
            <p>
              {rating}/{5}
            </p>
          </HStack>
        </HStack>
        <p className="text-grayText text-xs">{description}</p>
        <div className="flex items-end">
          <PriceDisplay
            price={price}
            className="mt-1"
            symbolProps={{ className: "text-primary" }}
          />
          /<span className="text-[0.625rem]">{t("Night")}</span>
        </div>
      </div>
    </div>
  );
};

export const MarketRestaurantServiceSearchCardAlt: React.FC<{
  name: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
}> = ({ location, name, price, rating, reviews, thumbnail }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-1">
      <AspectRatioImage alt={name} src={thumbnail} ratio={1.2}>
        <></>
      </AspectRatioImage>
      <div className="flex flex-col gap-2 p-1">
        <p className="text-[0.938rem] font-medium">{name}</p>
        <HStack>
          <LocationIcon className="text-primary" />
          <p className="text-xs">{location}</p>
        </HStack>
        <HStack>
          <StarIcon className="text-yellow-300" />
          <HStack className="text-xs text-grayText">
            <p>{rating}/5</p>
            <DotIcon />
            <p>{`(${reviews}) ${t("Reviews")}`}</p>
          </HStack>
        </HStack>
        <p className="flex items-end text-[0.938rem]">
          <PriceDisplay price={price} className="font-medium" />/
          <span className="text-[0.625rem]">{t("Serving")}</span>
        </p>
      </div>
    </div>
  );
};

export const MarketHealthCenterServiceCardAlt: React.FC<{
  title: string;
  location: string;
  speciality: string;
  thumbnail: string;
  appointments: string[];
  bookedAppointments: string[];
}> = ({
  location,
  speciality,
  thumbnail,
  title,
  appointments,
  bookedAppointments,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 p-1">
      <AspectRatioImage alt={title} ratio={1.7} src={thumbnail} />

      <div className="p-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm text-grayText">{speciality}</p>
          <HStack>
            <LocationIcon className="text-primary" />
            <p className="text-sm">{location}</p>
          </HStack>
        </div>

        <div className="max-h-40 overflow-y-scroll">
          <WorkingDaysCalender
            takenDates={bookedAppointments}
            workingDates={appointments}
          />
        </div>

        <Button className="w-full" colorScheme="darkbrown">
          <HStack className="text-white">
            <p className="text-sm font-semibold">{t("Book now")}</p>
            <ArrowRightIcon />
          </HStack>
        </Button>
      </div>
    </div>
  );
};

export const MarketVehicleServiceSearchCardAlt: React.FC<{
  pricePerDay: number;
  title: string;
  thumbnail: string;
  airCondition: boolean;
  windows: number;
  passengers: number;
  gps: boolean;
  luggage: number;
}> = ({
  pricePerDay,
  thumbnail,
  title,
  airCondition = true,
  gps = true,
  luggage = 0,
  passengers = 0,
  windows = 0,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 p-1">
      <AspectRatioImage src={thumbnail} alt={title} ratio={1.2} />
      <div className="flex flex-col gap-2">
        <p>{title}</p>

        <HStack className="flex-wrap">
          {airCondition ? (
            <HStack>
              <AirConditionIcon className="text-sm" />
              <p className="text-xs">{t("A/C")}</p>
            </HStack>
          ) : null}

          {gps ? (
            <HStack>
              <GPSIcon className="text-sm" />
              <p className="text-xs">{t("GPS")}</p>
            </HStack>
          ) : null}

          {passengers ? (
            <HStack>
              <PersonGroupIcon className="text-sm" />
              <p className="text-xs">{passengers}</p>
            </HStack>
          ) : null}

          {luggage ? (
            <HStack>
              <TransportLuggageIcon className="text-sm" />
              <p className="text-xs">{luggage}</p>
            </HStack>
          ) : null}

          {windows ? (
            <HStack>
              <CarWindowIcon className="text-sm" />
              <p className="text-xs">{windows}</p>
            </HStack>
          ) : null}
        </HStack>

        <div className="flex items-end">
          <PriceDisplay
            price={pricePerDay}
            symbolProps={{ className: "text-primary" }}
          />
          /{t("day")}
        </div>
      </div>
    </div>
  );
};

export const MarketBeautyCenterSearchCardAlt: React.FC<{
  title: string;
  thumbnail: string;
  category: string;
  rate: number;
  reviews: number;
  id: string;
}> = ({ category, id, rate, reviews, thumbnail, title }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 p-1">
      <AspectRatioImage
        className="rounded-md"
        alt={title}
        ratio={1.2}
        src={thumbnail}
      />
      <div className="p-1 flex flex-col gap-4">
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{category}</p>
        <HStack>
          <StarIcon className="text-yellow-300" />
          <HStack className="gap-1 text-grayText text-xs">
            <p>
              {rate}/{5}
            </p>
            <DotIcon />
            <p>{`(${reviews}) ${t("Reviews")}`}</p>
          </HStack>
        </HStack>
        <Button className="w-full">
          <HStack>
            <p className="text-sm">{t("Show on map")}</p>
            <MapIcon className="text-xl" />
          </HStack>
        </Button>
      </div>
    </div>
  );
};

export const MarketHolidayRentalsServiceSearchCardAlt: React.FC<{
  title: string;
  thumbnail: string;
  monthlyPrice: number;
  description: string;
  saved: boolean;
  sellerThumbnail: string;
  sellerName: string;
  sellerVerified: boolean;
  rating: number;
  reviews: number;
  location: string;
}> = ({
  description,
  monthlyPrice,
  thumbnail,
  title,
  saved,
  rating,
  reviews,
  sellerName,
  sellerThumbnail,
  sellerVerified,
  location,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-1">
      <AspectRatioImage ratio={1.7} src={thumbnail} alt={title}>
        <div className="top-2 right-2 flex justify-center items-center bg-black/30 rounded-full h-24 w-24">
          {saved ? <HeartFillIcon /> : <HeartOutlineAltIcon />}
        </div>
      </AspectRatioImage>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <HStack>
            <Avatar src={sellerThumbnail} />
            <p className="font-medium">{sellerName}</p>
            {sellerVerified ? <Verified /> : null}
          </HStack>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 items-center">
              <StarIcon className="text-yellow-300" />

              <p className="text-xs">{rating}/5</p>
            </div>
            <p className="text-xs">{`(${reviews}) ${t("Reviews")}`}</p>
          </div>
        </div>

        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm">{description}</p>

        <div className="flex justify-between gap-4">
          <div className="flex gap-1">
            <LocationOutlineIcon className="text-primary" />
            <p className="text-xs text-grayText">{location}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="flex items-end">
              <span>
                <PriceDisplay
                  price={monthlyPrice}
                  className="text-lg font-semibold"
                />
              </span>
              /<span>{t("Month")}</span>
            </p>
            <p className="text-xs">{t("Includes tax & fees") + "*"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
