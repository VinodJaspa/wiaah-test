import {
  LocationSearchInput,
  ResturantSearchInput,
  WorkingDaysCalender,
  WorkingDaysCalenderProps,
  usePaginationControls,
} from "@blocks";
import { ServiceAdaptation, ServiceType, ShopStatus } from "@features/API";
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
  Rate,
} from "@partials";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { SearchServiceQuery, useGetFilteredServicesQuery } from "../Services";
import { ServicesRequestKeys } from "../constants";
import { HealthCenterSearchBox } from "../HealthCenter";
import { VehicleSearchBox } from "../Vehicle";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export const MarketServiceSearchView: React.FC<{
  serviceType: ServiceType;
}> = ({ serviceType }) => {
  const { visit } = useRouting();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { data: _services } = useGetFilteredServicesQuery({
    pagination,
    filters: [],
  });
  const services = FAKE_SERVICES;
  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <div className="flex flex-col gap-4">
      {/* search bar */}
      <ServiceSearchBar showOn={showOn} serviceType={serviceType} />
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
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
                <MarketHolidayRentalsServiceSearchCardAlt
                  title={name}
                  thumbnail={thumbnail}
                  description={description}
                  location={`${shop?.location?.city}, ${shop?.location?.country}`}
                  monthlyPrice={price}
                  seller={{
                    name: shop.sellerProfile.username,
                    thumbnail: shop.sellerProfile.photo,
                    verified: shop.sellerProfile.verified,
                  }}
                  rating={rating}
                  saved={saved}
                  date={{ from: "Jul 30", to: "Jul 30" }}
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
                  description={description}
                  location={`${shop?.location?.city}, ${shop?.location?.country}`}
                  monthlyPrice={price}
                  seller={{
                    name: shop.sellerProfile.username,
                    thumbnail: shop.sellerProfile.photo,
                    verified: shop.sellerProfile.verified,
                  }}
                  rating={rating}
                  saved={saved}
                  date={{ from: "Jul 30", to: "Jul 30" }}
                />
              ) : null}
            </>
          ),
        )}
      </div>
      <Pagination controls={controls} />
    </div>
  );
};

const ServiceSearchBar = ({
  showOn,
  serviceType,
}: {
  showOn: (types: ServiceType[]) => boolean;
  serviceType: ServiceType;
}) => {
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  const { visit } = useRouting();
  return (
    <React.Fragment>
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
                    location,
                  ),
                );
              }}
            />
          ) : null}

          {showOn([ServiceType.Restaurant]) ? (
            <ResturantSearchInput
              onSubmit={() =>
                visit((routes) =>
                  routes.visitServiceLocationSearchResults(
                    ServicesRequestKeys.restaurant,
                    "location",
                  ),
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
    </React.Fragment>
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
      <AspectRatioImage alt={name} src={thumbnail} ratio={1.2} />
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
  appointments: WorkingDaysCalenderProps["workingDates"];
  bookedAppointments: WorkingDaysCalenderProps["workingDates"];
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
        <AspectRatioImage alt={title} ratio={1.2} src={thumbnail} />

        <div className="p-1 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text font-medium text-primary">{title}</p>
            <p className="text-lg text-gray-800 font-semibold">{speciality}</p>
            <div className="flex text-gray-500 flex-col gap-2">
              <p className="text-sm ">Address</p>
              <p className="text-sm">{location}</p>
            </div>
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
interface SellerInfo {
  thumbnail: string;
  name: string;
  verified: boolean;
}

interface MarketHolidayRentalsProps {
  title: string;
  thumbnail: string;
  monthlyPrice: number;
  description: string;
  saved: boolean;
  seller: SellerInfo;
  rating: number;
  location: string;
  date: { from: string; to: string };
}

export const MarketHolidayRentalsServiceSearchCardAlt: React.FC<
  MarketHolidayRentalsProps
> = ({
  title,
  thumbnail,
  monthlyPrice,
  description,
  saved,
  rating,
  location,
  date,
}) => {
    const { t } = useTranslation();
    const [isSaved, setIsSaved] = React.useState(saved);
    const toggleSaved = () => {
      setIsSaved((prevState) => !prevState);
    };
    return (
      <div className="flex flex-col gap-1 p-1">
        <AspectRatioImage
          ratio={1.04}
          imageClassName="rounded-xl relative"
          src={thumbnail}
          alt={title}
        >
          <div
            className="absolute top-2 right-2 text-white flex justify-center items-center rounded-full p-1 bg-black bg-opacity-40"
            onClick={toggleSaved}
          >
            {isSaved ? (
              <IoIosHeart className="w-5 h-5 " />
            ) : (
              <IoIosHeartEmpty className="w-5 h-5" />
            )}
          </div>
        </AspectRatioImage>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between mt-2">
            <p className="font-semibold ">{location}</p>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-2 items-center">
                <Rate rating={4} className="gap-1" starSize={18} />
                <p className="text-sm mt-1 font-medium">{rating}</p>
              </div>
            </div>
          </div>
          <div className="text-gray-500 flex gap-2 items-center">
            <span>{date.from}</span>
            <span>-</span>
            <span>{date.to}</span>
          </div>
          <p className="text-gray-500 font-medium">{description}</p>
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="flex items-start gap-1 text-lg font-semibold">
                <span>
                  <PriceDisplay
                    price={monthlyPrice}
                    className="text-lg font-semibold"
                  />
                </span>
                <span>total</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
const FAKE_SERVICES: SearchServiceQuery["searchServices"] = {
  __typename: "ServiceSearchResponse",
  hasMore: true,
  total: 100,
  data: [
    {
      __typename: "Service",
      id: "service-1",
      name: "Service",
      price: 250,
      beds: 2,
      bathrooms: 2,
      adaptedFor: [ServiceAdaptation.NewBorn],
      airCondition: true,
      gpsAvailable: false,
      seats: null,
      windows: 4,
      lugaggeCapacity: null,
      treatmentCategory: null,
      maxSpeedInKm: null,
      brand: null,
      description: "A service description.",
      ingredients: null,
      cleaningFee: 50,
      reviews: 85,
      thumbnail: "/shop.jpeg",
      rating: 4.8,
      type: ServiceType.Hotel,
      title: "Luxury Suite",
      speciality: "Dentist",
      availableAppointments: null,
      healthCenterBookedAppointments: [],
      saved: true,
      sellerId: "seller-1",
      updatedAt: "2024-12-08T12:00:00.000Z",
      shop: {
        __typename: "Shop",
        id: "shop-1",
        status: ShopStatus.Active,
        location: {
          __typename: "Location",
          address: "123 Main Street",
          city: "Metropolis",
          country: "Countryland",
          lat: 40.7128,
          long: -74.006,
          state: "Stateville",
        },
        sellerProfile: {
          __typename: "Profile",
          username: "LuxurySeller",
          verified: true,
          photo: "/shop-2.jpeg",
        },
      },
    },
    {
      __typename: "Service",
      id: "service-2",
      name: "Service",
      price: 40,
      beds: null,
      bathrooms: null,
      adaptedFor: null,
      airCondition: true,
      gpsAvailable: true,
      seats: 4,
      windows: 4,
      lugaggeCapacity: 2,
      treatmentCategory: null,
      maxSpeedInKm: 180,
      brand: "EconomyBrand",
      description: "A service description.",
      ingredients: null,
      cleaningFee: 10,
      reviews: 64,
      thumbnail: "/shop.jpeg",
      rating: 4.2,
      type: ServiceType.Vehicle,
      title: "Compact Car",
      speciality: "Dentist",
      availableAppointments: null,
      healthCenterBookedAppointments: [],
      saved: false,
      sellerId: "seller-2",
      updatedAt: "2024-12-08T12:00:00.000Z",
      shop: {
        __typename: "Shop",
        id: "shop-2",
        status: ShopStatus.Active,
        location: {
          __typename: "Location",
          address: "456 Side Street",
          city: "Smalltown",
          country: "Countryland",
          lat: 38.8977,
          long: -77.0365,
          state: "Stateburg",
        },
        sellerProfile: {
          __typename: "Profile",
          username: "CarRentalPro",
          verified: false,
          photo: "/shop-2.jpeg",
        },
      },
    },

    {
      __typename: "Service",
      id: "service-1",
      name: "Service",
      price: 250,
      beds: 2,
      bathrooms: 2,
      adaptedFor: [ServiceAdaptation.NewBorn],
      airCondition: true,
      gpsAvailable: false,
      seats: null,
      windows: 4,
      lugaggeCapacity: null,
      treatmentCategory: null,
      maxSpeedInKm: null,
      brand: null,
      description: "A service description.",
      ingredients: null,
      cleaningFee: 50,
      reviews: 85,
      thumbnail: "/shop.jpeg",
      rating: 4.8,
      type: ServiceType.Hotel,
      title: "Luxury Suite",
      speciality: "Dentist",
      availableAppointments: null,
      healthCenterBookedAppointments: [],
      saved: true,
      sellerId: "seller-1",
      updatedAt: "2024-12-08T12:00:00.000Z",
      shop: {
        __typename: "Shop",
        id: "shop-1",
        status: ShopStatus.Active,
        location: {
          __typename: "Location",
          address: "123 Main Street",
          city: "Metropolis",
          country: "Countryland",
          lat: 40.7128,
          long: -74.006,
          state: "Stateville",
        },
        sellerProfile: {
          __typename: "Profile",
          username: "LuxurySeller",
          verified: true,
          photo: "/shop-2.jpeg",
        },
      },
    },

    {
      __typename: "Service",
      id: "service-1",
      name: "Service",
      price: 250,
      beds: 2,
      bathrooms: 2,
      adaptedFor: [ServiceAdaptation.NewBorn],
      airCondition: true,
      gpsAvailable: false,
      seats: null,
      windows: 4,
      lugaggeCapacity: null,
      treatmentCategory: null,
      maxSpeedInKm: null,
      brand: null,
      description: "A service description.",
      ingredients: null,
      cleaningFee: 50,
      reviews: 85,
      thumbnail: "/shop.jpeg",
      rating: 4.8,
      type: ServiceType.Hotel,
      title: "Luxury Suite",
      speciality: "Dentist",
      availableAppointments: null,
      healthCenterBookedAppointments: [],
      saved: true,
      sellerId: "seller-1",
      updatedAt: "2024-12-08T12:00:00.000Z",
      shop: {
        __typename: "Shop",
        id: "shop-1",
        status: ShopStatus.Active,
        location: {
          __typename: "Location",
          address: "123 Main Street",
          city: "Metropolis",
          country: "Countryland",
          lat: 40.7128,
          long: -74.006,
          state: "Stateville",
        },
        sellerProfile: {
          __typename: "Profile",
          username: "LuxurySeller",
          verified: true,
          photo: "/shop-2.jpeg",
        },
      },
    },
  ],
};
