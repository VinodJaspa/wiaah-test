import { Formik, Form } from "formik";
import React from "react";
import {
  RecommendedBeautyCenterSearchList,
  ResturantFindTableFilterStepper,
  SearchFilter,
  ServicesSearchResultsFiltersSidebar,
  useGetServiceSearchFiltersQuery,
  useSearchFilters,
  DisplayFoundServices,
} from "ui";
import { randomNum } from "utils";

export const BeautyCenterSearchResultsView: React.FC = () => {
  const { filters, getLocationFilterQuery } = useSearchFilters();
  console.log("filters", filters);
  const { data, isLoading, isError } = useGetServiceSearchFiltersQuery(filters);

  return (
    <div className="flex flex-col  md:flex-row gap-4 p-4">
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
      <div className="flex flex-col w-full gap-2">
        <DisplayFoundServices
          location={getLocationFilterQuery}
          servicesNum={randomNum(500)}
        />
        <RecommendedBeautyCenterSearchList />
      </div>
    </div>
  );
};
