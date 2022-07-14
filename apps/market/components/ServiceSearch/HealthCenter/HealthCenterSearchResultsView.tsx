import { Form, Formik } from "formik";
import { usePagination } from "hooks";
import React from "react";
import {
  HealthCenterServiceSearchResultsList,
  SearchFilter,
  useGetHealthCenterFiltersQuery,
} from "ui";

export const HealthCenterSearchResultsView: React.FC = () => {
  const { data: res, isLoading, isError } = useGetHealthCenterFiltersQuery();
  return (
    <div className="flex gap-4 p-4">
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ setFieldValue, values }) => {
          return (
            <Form className="flex flex-col min-w-[20rem]">
              <SearchFilter
                collapse
                defaultOpen
                fallbackProps={{ isLoading, isError }}
                filters={Array.isArray(res) ? res : []}
              />
            </Form>
          );
        }}
      </Formik>
      <HealthCenterServiceSearchResultsList />
    </div>
  );
};
