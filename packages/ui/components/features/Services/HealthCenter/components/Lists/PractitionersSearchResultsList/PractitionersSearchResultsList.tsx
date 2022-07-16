import { usePagination } from "hooks";
import React from "react";
import {
  useSearchFilters,
  SpinnerFallback,
  PractitionerSearchResultsCard,
  Pagination,
  useSetResturantsDataState,
  useGetHealthCenterPractitionersQuery,
} from "ui";

export const PractitionersSearchResultsList: React.FC = () => {
  const { take, page, nextPage, previousPage, goToPage } = usePagination(8);
  const { filters } = useSearchFilters();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetHealthCenterPractitionersQuery({ page, take }, filters);
  return (
    <div className="w-full flex flex-col gap-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <div
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(15rem,calc(25% - 0.8rem)))",
          }}
          className="w-full grid gap-4"
        >
          {Array.isArray(res?.data)
            ? res?.data.map((s) => (
                <PractitionerSearchResultsCard practitioner={s} />
              ))
            : null}
        </div>
      </SpinnerFallback>
      <Pagination onPageChange={(num) => goToPage(num)} />
    </div>
  );
};
