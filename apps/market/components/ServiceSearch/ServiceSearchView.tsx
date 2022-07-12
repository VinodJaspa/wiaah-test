import { ServiceMetaData } from "api";
import React from "react";
import {
  LocationSearchInput,
  useGetServicesMetaDataQuery,
  SpinnerFallback,
  ServiceSearchCard,
} from "ui";

export const ServiceSearchView: React.FC = () => {
  const [location, setLocation] = React.useState<string>("Paris, France");
  const [services, setServices] = React.useState<ServiceMetaData[]>();
  const { isLoading, isError } = useGetServicesMetaDataQuery(10, 1, location, {
    onSuccess: (data) => setServices(data),
  });

  return (
    <section className="w-full flex flex-col gap-16 justify-center items-center p-8">
      <LocationSearchInput
        onLocationSelect={(location) => setLocation(location)}
        className=""
      />
      <SpinnerFallback isError={isError} isLoading={isLoading}>
        <div className="w-full mx-auto justify-between gap-4 grid grid-cols-[repeat(auto-fit,minmax(10rem,23%))]">
          {Array.isArray(services)
            ? services.map(({ ...serviceData }) => (
                <ServiceSearchCard
                  {...serviceData}
                  onLiked={(id) => {
                    console.log(id);
                  }}
                  providerName={serviceData.serviceProvider}
                  thumbnail={serviceData.serviceThumbnail}
                  id={serviceData.serviceId}
                />
              ))
            : null}
        </div>
      </SpinnerFallback>
    </section>
  );
};
