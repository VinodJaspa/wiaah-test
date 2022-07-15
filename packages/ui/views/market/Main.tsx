import { HealthCenterSearchResultsView } from "../../../../apps/market/components/ServiceSearch/HealthCenter/HealthCenterSearchResultsView";
import {
  NotFound,
  ServicesRequestKeys,
  HealthCenterServiceSearchResultsList,
  ScrollingWrapper,
  RenderMap,
  useGetServicesSortingFiltersQuery,
  SearchFilter,
  useGetHealthCenterFiltersQuery,
  DateInput,
  ResturantFindTableFilterDateDayComponent,
  HealthCenterSearchBox,
  Container,
} from "ui";
import { getServiceView, ServicesTypeSwitcher } from "utils";
import MasterLayout from "../../../../apps/market/components/MasterLayout";
import React from "react";
import { Form, Formik } from "formik";
export const Main: React.FC = () => {
  const { data: res, isLoading, isError } = useGetHealthCenterFiltersQuery();
  return (
    <MasterLayout>
      <Container>
        <div className="flex flex-col gap-4 p-4">
          <HealthCenterSearchBox />
          <div className="flex gap-2">
            <Formik initialValues={{}} onSubmit={() => {}}>
              {({ setFieldValue, values }) => {
                return (
                  <Form className="flex flex-col ">
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
            <HealthCenterServiceSearchResultsList />
          </div>
        </div>
      </Container>
    </MasterLayout>
  );
};
