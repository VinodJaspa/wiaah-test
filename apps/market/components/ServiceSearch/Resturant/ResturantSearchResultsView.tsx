import { Form, Formik } from "formik";
import React from "react";
import {
  ResturantFindTableFilterStepper,
  ResturantSearchList,
  SearchFilter,
  useGetResturantSearchFiltersQuery,
  ServicesSearchResultsFiltersSidebar,
} from "ui";

export const ResturantSearchResultsView: React.FC = () => {
  const { data, isLoading, isError } = useGetResturantSearchFiltersQuery();

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
      <ResturantSearchList />
    </div>
  );
};
