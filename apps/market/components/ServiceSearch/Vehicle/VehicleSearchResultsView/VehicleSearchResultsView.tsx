import { Formik, Form } from "formik";
import React from "react";
import {
  SearchFilter,
  VehicleSearchList,
  useGetServiceSearchFiltersQuery,
  useSearchFilters,
  DateInput,
  ResturantFindTableFilterDateDayComponent,
  ServicesSearchResultsFiltersSidebar,
} from "ui";

export const VehicleSearchResultsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const { isLoading, isError, data } = useGetServiceSearchFiltersQuery(filters);
  return (
    <div className="flex gap-8 flex-col md:flex-row px-6">
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="flex flex-col w-[25rem]">
                <DateInput
                  className="w-[100%]"
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
      </ServicesSearchResultsFiltersSidebar>
      <VehicleSearchList />
    </div>
  );
};
