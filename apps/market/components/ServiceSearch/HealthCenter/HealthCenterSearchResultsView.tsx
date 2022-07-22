import { Form, Formik } from "formik";
import { usePagination, useResponsive } from "hooks";
import React from "react";
import {
  DateInput,
  HealthCenterServiceSearchResultsList,
  SearchFilter,
  useGetHealthCenterFiltersQuery,
  ResturantFindTableFilterDateDayComponent,
  HealthCenterSearchBox,
  ServicesSearchResultsFiltersSidebar,
} from "ui";

export const HealthCenterSearchResultsView: React.FC = () => {
  const { data: res, isLoading, isError } = useGetHealthCenterFiltersQuery();
  const { isTablet } = useResponsive();
  return (
    <div className="flex flex-col gap-4">
      <HealthCenterSearchBox />
      <div className={`${isTablet ? "flex-col" : "flex-row"} flex gap-4`}>
        <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({ setFieldValue, values }) => {
              return (
                <Form className="flex flex-col ">
                  <DateInput
                    className="w-[100%]"
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
        </ServicesSearchResultsFiltersSidebar>
        <HealthCenterServiceSearchResultsList />
      </div>
    </div>
  );
};
