import { Formik, Form } from "formik";
import React from "react";
import {
  RecommendedBeautyCenterSearchList,
  SearchFilter,
  ServicesSearchResultsFiltersSidebar,
  useGetServiceSearchFiltersQuery,
  useSearchFilters,
  DisplayFoundServices,
  ServiceBookingStepper,
  CalenderIcon,
  DateInput,
  ClockIcon,
  TimeInput,
  useGetFilteredBeautyCenterTreatmentsQuery,
  SpinnerFallback,
  Pagination,
  usePaginationControls,
  ServiceType,
} from "ui";
import { randomNum } from "utils";

export const BeautyCenterSearchResultsView: React.FC = () => {
  const filter: ServiceType = ServiceType.BeautyCenter;
  const { controls, pagination } = usePaginationControls();
  const { data, isLoading, isError } = useGetServiceSearchFiltersQuery(filter);
  const {
    data: treatments,
    isLoading: treatmentsIsLoading,
    isError: treatmentsIsError,
  } = useGetFilteredBeautyCenterTreatmentsQuery({ pagination });

  return (
    <div className="flex flex-col  md:flex-row gap-4 p-4">
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="flex flex-col">
                <ServiceBookingStepper
                  steps={[
                    { name: "Date", icon: CalenderIcon, component: DateInput },
                    { name: "time", icon: ClockIcon, component: TimeInput },
                  ]}
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
      <div className="flex flex-col w-full gap-2">
        <DisplayFoundServices
          location={"milano"}
          servicesNum={randomNum(500)}
        />
        <SpinnerFallback
          isLoading={treatmentsIsLoading}
          isError={treatmentsIsError}
        >
          <RecommendedBeautyCenterSearchList treatments={treatments} />
          <Pagination controls={controls} />
        </SpinnerFallback>
      </div>
    </div>
  );
};
