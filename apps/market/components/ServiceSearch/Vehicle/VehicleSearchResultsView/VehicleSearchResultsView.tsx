import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  SearchFilter,
  VehicleSearchList,
  useGetServiceSearchFiltersQuery,
  useSearchFilters,
  DateInput,
  ResturantFindTableFilterDateDayComponent,
  ServicesSearchResultsFiltersSidebar,
  DateAndTimeInput,
} from "ui";

export const VehicleSearchResultsView: React.FC = () => {
  const { t } = useTranslation();
  const { filters } = useSearchFilters();
  const { isLoading, isError, data } = useGetServiceSearchFiltersQuery(filters);
  return (
    <div className="flex gap-4 flex-col md:flex-row px-2">
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="flex gap-4 flex-col">
                <div className="flex flex-col gap-2">
                  <DateAndTimeInput
                    onDateChange={() => {}}
                    dateLabel={t("Pick-up Date")}
                  />
                  <DateAndTimeInput
                    onDateChange={() => {}}
                    dateLabel={t("Return Date")}
                  />
                </div>
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
