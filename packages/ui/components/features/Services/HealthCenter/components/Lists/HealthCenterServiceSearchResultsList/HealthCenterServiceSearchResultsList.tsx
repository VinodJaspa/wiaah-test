import { usePagination } from "hooks";
import React from "react";
import {
  useSearchFilters,
  SpinnerFallback,
  PractitionerSearchResultsCard,
  Pagination,
  useSetResturantsDataState,
  HealthCenterCard,
} from "ui";
import { useGetHealthCenterDataQuery } from "../../../services";

export const HealthCenterServiceSearchResultsList: React.FC = () => {
  const { take, page, nextPage, previousPage, goToPage } = usePagination(8);
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetHealthCenterDataQuery({ page, take }, filters);
  return (
    <div className="w-full flex flex-col gap-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <div className="flex flex-col gap-4">
          {Array.isArray(res?.data)
            ? res?.data.map((s) => (
                <HealthCenterCard
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
