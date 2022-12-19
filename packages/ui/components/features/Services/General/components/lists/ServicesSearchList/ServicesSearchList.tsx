import { ServiceData } from "api";
import { usePagination } from "hooks";
import React from "react";
import {
  useGetServicesData,
  useSearchFilters,
  PaginationWrapper,
  ServicesSearchGrid,
  ServicesSearchCard,
  ServicesSearchCardProps,
} from "@UI";

export const ServicesSearchList: React.FC = () => {
  const { take, page } = usePagination(8);
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
            vertical: true,
          };
        }}
      />
    </PaginationWrapper>
  );
};
