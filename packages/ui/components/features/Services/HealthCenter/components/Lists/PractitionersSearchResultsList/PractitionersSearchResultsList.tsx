import { usePagination } from "hooks";
import React from "react";
import { ArrElement } from "types";
import {
  useSearchFilters,
  SpinnerFallback,
  PractitionerSearchResultsCard,
  Pagination,
  useGetHealthCenterPractitionersQuery,
  ServicesSearchGrid,
  PractitionerSearchResultsCardProps,
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
        {res ? (
          <ServicesSearchGrid<
            ArrElement<typeof res.data>,
            PractitionerSearchResultsCardProps
          >
            data={res.data}
            handlePassData={(data) => ({ practitioner: data })}
            component={PractitionerSearchResultsCard}
          />
        ) : null}
      </SpinnerFallback>
      <Pagination onPageChange={(num) => goToPage(num)} />
    </div>
  );
};
