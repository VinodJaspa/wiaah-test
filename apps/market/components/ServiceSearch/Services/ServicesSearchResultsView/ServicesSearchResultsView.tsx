import { Form } from "antd";
import { Formik } from "formik";
import React from "react";
import {
  DateInput,
  ServicesSearchList,
  ResturantFindTableFilterDateDayComponent,
  SearchFilter,
  ServicesRequestKeys,
  SERVICESTYPE_INDEXKEY,
  useGetServiceSearchFiltersQuery,
  ServicesSearchResultsFiltersSidebar,
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
    <div className="flex flex-col md:flex-row gap-8 w-full">
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="flex flex-col w-full">
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
      <ServicesSearchList />
    </div>
  );
};
