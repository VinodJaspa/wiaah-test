import { ServiceType } from "@features/API";
import React from "react";
import DoctorsPage from "@features/Services/components/HealthCenter";
import HotelsPageMarket from "@features/Services/components/Hotel";
import RestaurantsPage from "@features/Services/components/Restaurant";
import VehiclePage from "@features/Services/components/Vehicle";
export const MarketServiceSearchViewSections: React.FC<{
  serviceType: ServiceType;
}> = ({ serviceType }) => {
  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <>
      {showOn([ServiceType.Hotel]) ? (
        <HotelsPageMarket />
      ) : null}
      {showOn([ServiceType.Restaurant]) ? (
        <RestaurantsPage />
      ) : null}

      {showOn([ServiceType.HealthCenter]) ? (
        <DoctorsPage />
      ) : null}

      {showOn([ServiceType.Vehicle]) ? (
        <VehiclePage />
      ) : null}

      {/* {showOn([ServiceType.BeautyCenter]) ? (
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
              ) : null} */}
    </>


  );
};

