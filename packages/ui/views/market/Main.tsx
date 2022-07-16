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
      <Container></Container>
    </MasterLayout>
  );
};
