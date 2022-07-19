import { Formik, Form } from "formik";
import React from "react";
import {
  ResturantFindTableFilterStepper,
  SearchFilter,
  VehicleSearchList,
  useGetServiceSearchFiltersQuery,
  useSearchFilters,
  DateInput,
  ResturantFindTableFilterDateDayComponent,
} from "ui";

export const VehicleSearchResultsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const { isLoading, isError, data } = useGetServiceSearchFiltersQuery(filters);
  return (
    <div className="flex gap-4 p-4">
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ setFieldValue, values }) => {
          return (
            <Form className="flex flex-col">
              <DateInput
                dayComponent={ResturantFindTableFilterDateDayComponent}
              />
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
      <VehicleSearchList />
    </div>
  );
};
