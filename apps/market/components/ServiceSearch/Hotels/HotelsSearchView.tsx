import { HotelsMetaData } from "api";
import { usePagination } from "hooks";
import React from "react";
import {
  LocationSearchInput,
  useGetHotelsMetaDataQuery,
  SpinnerFallback,
  HotelSearchCard,
  PaginationWrapper,
} from "ui";

export const HotelsSearchView: React.FC = () => {
  const [location, setLocation] = React.useState<string>("Paris, France");
  const [services, setServices] = React.useState<HotelsMetaData[]>([]);
  const { take, page } = usePagination();
  const { isLoading, isError } = useGetHotelsMetaDataQuery(
    { page, take },
    location,
    {
      onSuccess: (res) => setServices(res?.data || []),
    }
  );

  return (
    <section className="w-full flex flex-col gap-16 justify-center items-center p-8">
      <LocationSearchInput
        onLocationSelect={(location) => setLocation(location)}
        className=""
      />
      <PaginationWrapper>
        <SpinnerFallback isError={isError} isLoading={isLoading}>
          <div className="w-full mx-auto justify-center gap-4 grid grid-cols-[repeat(auto-fit,minmax(10rem,23%))]">
            {Array.isArray(services)
              ? services.map(({ ...serviceData }) => (
                  <HotelSearchCard
                    {...serviceData}
                    onLiked={(id) => {}}
                    providerName={serviceData.serviceProvider}
                    thumbnail={serviceData.serviceThumbnail}
                    id={serviceData.serviceId}
                  />
                ))
              : null}
          </div>
        </SpinnerFallback>
      </PaginationWrapper>
    </section>
  );
};
