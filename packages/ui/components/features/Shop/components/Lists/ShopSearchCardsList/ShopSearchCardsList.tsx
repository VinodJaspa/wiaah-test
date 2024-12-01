import { usePagination } from "hooks";
import React from "react";
import {
  useSearchFilters,
  uesGetShopsOnmapSearchQuery,
  PaginationWrapper,
  ServicesSearchGrid,
  ShopMapSearchCard,
} from "@UI";

export const ShopsSearchCardsList: React.FC = () => {
  const { page, take } = usePagination(16);
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = uesGetShopsOnmapSearchQuery({ page, take }, filters);

  return (
    <PaginationWrapper>
      <ServicesSearchGrid
        cols={1}
        data={res?.data || []}
        handlePassData={(data) => data}
        component={ShopMapSearchCard}
      />
    </PaginationWrapper>
  );
};
