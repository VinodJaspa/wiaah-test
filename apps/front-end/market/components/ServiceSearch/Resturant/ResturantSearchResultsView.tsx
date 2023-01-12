import { Form, Formik } from "formik";
import React from "react";
import {
  ResturantFindTableFilterStepper,
  ResturantSearchList,
  SearchFilter,
  useGetResturantSearchFiltersQuery,
  ServicesSearchResultsFiltersSidebar,
  DisplayFoundServices,
  useSearchFilters,
  useGetResturantsQuery,
  usePaginationControls,
  Pagination,
} from "ui";
import { randomNum } from "utils";

export const ResturantSearchResultsView: React.FC = () => {
  const { data, isLoading, isError } = useGetResturantSearchFiltersQuery();
  const { getLocationFilterQuery } = useSearchFilters();
  const { controls, pagination } = usePaginationControls();
  const { data: restaurants } = useGetResturantsQuery({ pagination });
  return (
    <div className="flex flex-col md:flex-row gap-4 py-4">
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="flex flex-col">
                <ResturantFindTableFilterStepper />

                <SearchFilter
                  collapse
                  defaultOpen
                  fallbackProps={{ isLoading, isError }}
                  filters={Array.isArray(data) ? data : []}
                />
              </Form>
            );
          }}
        </Formik>
      </ServicesSearchResultsFiltersSidebar>
      <div className="flex flex-col gap-2">
        <DisplayFoundServices
          location={getLocationFilterQuery || ""}
          servicesNum={randomNum(500)}
        />
        <Pagination controls={controls}>
          <ResturantSearchList restaurants={restaurants} />
        </Pagination>
      </div>
    </div>
  );
};
