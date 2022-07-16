import { Form } from "antd";
import { Formik } from "formik";
import React from "react";
import {
  DateInput,
  ServicesSearchResultsList,
  ResturantFindTableFilterDateDayComponent,
  SearchFilter,
  ServicesRequestKeys,
  SERVICESTYPE_INDEXKEY,
  useGetServiceSearchFiltersQuery,
} from "ui";

export const ServicesSearchResultsView: React.FC = () => {
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServiceSearchFiltersQuery({
    [SERVICESTYPE_INDEXKEY]: ServicesRequestKeys.general,
  });

  return (
    <div className="flex gap-8 p-4 w-full">
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ setFieldValue, values }) => {
          return (
            <Form className="flex flex-col w-64">
              <DateInput
                dayComponent={ResturantFindTableFilterDateDayComponent}
              />
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
      <ServicesSearchResultsList />
    </div>
  );
};
