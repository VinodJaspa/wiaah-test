import { usePagination } from "hooks";
import React from "react";
import { ServiceData } from "api";
import {
  useSearchFilters,
  PaginationWrapper,
  ServicesSearchGrid,
  useGetServicesData,
  ServicesSearchCard,
  ServicesSearchCardProps,
} from "@UI";

export const ServicesSearchResultsList: React.FC = () => {
  const { take, page } = usePagination();
  const { filters } = useSearchFilters();
  const [services, setServices] = React.useState<ServiceData[]>([]);
  const { data } = useGetServicesData({ page, take }, filters, {
    onSuccess: (d) => {
      setServices(d.data);
    },
  });

  return (
    <PaginationWrapper>
      <ServicesSearchGrid<ServiceData, ServicesSearchCardProps>
        component={ServicesSearchCard}
        data={services}
        handlePassData={(service) => {
          return {
            serviceData: service,
          };
        }}
        gridRule={"repeat(auto-fit,minmax(30rem,calc(100%)))"}
      />
    </PaginationWrapper>
  );
};
