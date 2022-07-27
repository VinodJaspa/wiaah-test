import { HotelsMetaData } from "api";
import { usePagination } from "hooks";
import React from "react";
import { ArrElement } from "types";
import {
  LocationSearchInput,
  useGetHotelsMetaDataQuery,
  SpinnerFallback,
  HotelSearchCard,
  PaginationWrapper,
  ServicesSearchGrid,
  HotelSearchCardProps,
} from "ui";

export const HotelsSearchView: React.FC = () => {
  const [location, setLocation] = React.useState<string>("Paris, France");
  const [services, setServices] = React.useState<HotelsMetaData[]>([]);
  const { take, page } = usePagination(8);
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
          <ServicesSearchGrid<ArrElement<typeof services>, HotelSearchCardProps>
            component={HotelSearchCard}
            data={services}
            handlePassData={(data) => ({ ...data, onLiked: () => {} })}
          />
        </SpinnerFallback>
      </PaginationWrapper>
    </section>
  );
};
