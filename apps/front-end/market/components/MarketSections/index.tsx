import { ServiceType } from "@features/API";
import React from "react";
import DoctorsPage from "@features/Services/components/HealthCenter";
import HotelsPageMarket from "@features/Services/components/Hotel";
import RestaurantsPage from "@features/Services/components/Restaurant";
import VehiclePage from "@features/Services/components/Vehicle";
import BeautyCenterPage from "@features/Services/components/BeautyCenter";
export const MarketServiceSearchViewSections: React.FC<{
  serviceType: ServiceType;
}> = ({ serviceType }) => {
  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <>
      <>
        {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
          <HotelsPageMarket />
        ) : null}
      </>

      {showOn([ServiceType.Restaurant]) ? (
        <RestaurantsPage />
      ) : null}

      {showOn([ServiceType.HealthCenter]) ? (
        <DoctorsPage />
      ) : null}

      {showOn([ServiceType.Vehicle]) ? (
        <VehiclePage />
      ) : null}
        {showOn([ServiceType.BeautyCenter]) ? (
        <BeautyCenterPage />
      ) : null}


    </>


  );
};

