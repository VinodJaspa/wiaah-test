import { usePagination, useResponsive } from "hooks";
import React from "react";
import {
  useSearchFilters,
  SpinnerFallback,
  Pagination,
  HealthCenterCard,
} from "ui";
import { useGetHealthCentersDataQuery } from "ui";

export const HealthCenterServiceSearchResultsList: React.FC = () => {
  const { take, page, goToPage } = usePagination(8);
  const { filters } = useSearchFilters();
  const { isTablet } = useResponsive();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetHealthCentersDataQuery({ page, take }, filters);
  return (
    <div className="w-full flex flex-col gap-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <div className="flex flex-col gap-4">
          {Array.isArray(res?.data)
            ? res?.data.map((s) => (
                <HealthCenterCard
                  vertical={isTablet}
                  centerData={s.centerData}
                  workingDates={s.workingDates}
                />
              ))
            : null}
        </div>
      </SpinnerFallback>
      <Pagination onPageChange={(num) => goToPage(num)} />
    </div>
  );
};
