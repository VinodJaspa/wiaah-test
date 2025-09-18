import {
  LocationSearchInput,

  RestaurantSearchInput,

  usePaginationControls,
} from "@blocks";
import { ServiceAdaptation, ServiceType, ShopStatus } from "@features/API";
import { useResponsive } from "hooks";
import React from "react";
import { useRouting } from "routing";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Pagination,
  SearchIcon,
} from "@partials";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { SearchServiceQuery, useGetFilteredServicesQuery } from "../Services";
import { ServicesRequestKeys } from "../constants";
import { HealthCenterSearchBox } from "../HealthCenter";
import { VehicleSearchBox } from "../Vehicle";
import {
  MarketHolidayRentalsServiceSearchCardAlt,
  MarketRestaurantServiceSearchCardAlt,
  MarketVehicleServiceSearchCardAlt,
  MarketHealthCenterServiceCardAlt,
  MarketBeautyCenterSearchCardAlt,
} from "./MarketSearviceSearchItems";
import { FAKE_FILTERED_SERVICES } from "placeholder";

export const MarketServiceSearchView: React.FC<{
  serviceType: ServiceType;
}> = ({ serviceType }) => {
  const { controls, pagination } = usePaginationControls();
  const { data: _services } = useGetFilteredServicesQuery({
    pagination,
    serviceType:serviceType,
    filters: [],
  });
  const services = FAKE_FILTERED_SERVICES;
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
                  id={id}
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
                  id={id}
                  reviews={reviews}
                  location={shop.location}
                  name={name}
                  price={price}
                  rating={rating}
                  images={[thumbnail, thumbnail]}
                />
              ) : null}

              {showOn([ServiceType.HealthCenter]) ? (
                <MarketHealthCenterServiceCardAlt
                  id={id}
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
                  id={id}
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
                  name={shop.sellerProfile.username}
                />
              ) : null}

              {showOn([ServiceType.HolidayRentals]) ? (
                <MarketHolidayRentalsServiceSearchCardAlt
                  id={id}
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

  const renderMobileSearchBar = () => {
    if (showOn([ServiceType.Hotel, ServiceType.HolidayRentals])) {
      return (
        <HStack>
          <InputGroup className="w-full">
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input />
          </InputGroup>
          <Button>{t("Submit")}</Button>
        </HStack>
      );
    }
    return null;
  };

  const renderDesktopSearchBar = () => {
    const searchComponents = [
      {
        types: [
          ServiceType.Hotel,
          ServiceType.HolidayRentals,
          ServiceType.BeautyCenter,
        ],
        component: (
          <LocationSearchInput
            onLocationSelect={(location) =>
              visit((routes) =>
                routes.visitServiceLocationSearchResults(serviceType, location),
              )
            }
          />
        ),
      },
      {
        types: [ServiceType.Restaurant],
        component: (
          <RestaurantSearchInput
            onSubmit={() =>
              visit((routes) =>
                routes.visitServiceLocationSearchResults(
                  ServicesRequestKeys.restaurant,
                  "location",
                ),
              )
            }
          />
        ),
      },
      {
        types: [ServiceType.HealthCenter],
        component: <HealthCenterSearchBox />,
      },
      {
        types: [ServiceType.Vehicle],
        component: <VehicleSearchBox />,
      },
    ];

    return searchComponents
      .filter(({ types }) => showOn(types))
      .map(({ component }, idx) => (
        <React.Fragment key={idx}>{component}</React.Fragment>
      ));
  };

  return (
    <React.Fragment>
      {isMobile ? renderMobileSearchBar() : renderDesktopSearchBar()}
    </React.Fragment>
  );
};
