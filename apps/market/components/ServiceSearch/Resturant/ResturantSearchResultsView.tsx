import { Form, Formik } from "formik";
import React from "react";
import {
  ResturantFindTableFilterStepper,
  ResturantSearchList,
  SearchFilter,
  useGetResturantSearchFiltersQuery,
} from "ui";

export const ResturantSearchResultsView: React.FC = () => {
  const { data, isLoading, isError } = useGetResturantSearchFiltersQuery();

  return (
    <div className="flex gap-4 p-4">
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
      <ResturantSearchList />
    </div>
  );
};
