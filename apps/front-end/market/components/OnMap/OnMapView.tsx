import { useResponsive } from "hooks";
import { ServerType } from "mongodb";
import { useRouter } from "next/router";
import React from "react";
import { ServiceType } from "@features/API";
import {
  RenderMap,
  ScrollingWrapper,
  LocationSearchInput,
  MarketServiceSearchResaultsView,
  useGetFilteredServicesQuery,
  usePaginationControls,
  ServicesCardsSwitcherView,
} from "ui";
import {
  ExtractServiceTypeFromQuery,
  getServiceView,
  ServicesTypeSwitcher,
  useForm,
} from "utils";

interface OnMapViewProps {
  searchLocation: string;
}

export const OnMapView: React.FC<OnMapViewProps> = ({ searchLocation }) => {
  const router = useRouter();
  const { controls, pagination } = usePaginationControls();
  const { form } = useForm<Parameters<typeof useGetFilteredServicesQuery>[0]>({
    pagination,
    filters: [],
  });
  const {
    data: services,
    isLoading,
    isError,
  } = useGetFilteredServicesQuery(form);
  const serviceType = ExtractServiceTypeFromQuery(router.query) as ServiceType;
  const { isTablet } = useResponsive();

  console.log("SEARCH LOCATION ===> " + searchLocation);

  const showOn = (types: ServiceType[]) => types.includes(serviceType);
  return (
    <div className="flex p-4 flex-col gap-2">
      <span className="w-full md:w-1/2">
        <LocationSearchInput onLocationSelect={() => { }} />
      </span>
      <div className="w-full h-full flex">
        <ServicesCardsSwitcherView
          serviceType={serviceType}
          services={services}
          showOn={showOn}
          searchQuery={searchLocation}
        />
        <div className="w-full h-[500px] ">
          <RenderMap location={searchLocation} />
        </div>
      </div>
    </div>
  );
};
