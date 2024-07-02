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

const FAKE_TREATMENTS = [
  {
    title: "Deep Tissue Massage",
    price: 80.0,
    duration: 60,
    id: "treatment1",
    category: "Massage",
    thumbnail: "https://example.com/deep-tissue-massage.jpg",
    rate: 4.5,
    reviews: 120,
  },
  {
    title: "Facial Treatment",
    price: 100.0,
    duration: 45,
    id: "treatment2",
    category: "Facial",
    thumbnail: "https://example.com/facial-treatment.jpg",
    rate: 4.0,
    reviews: 90,
  },
];

export const BeautyCenterSearchResultsView: React.FC = () => {
  const filter: ServiceType = ServiceType.BeautyCenter;
  const { controls, pagination } = usePaginationControls();
  //WARNING Graphql is no ready yet
  const { data, isLoading, isError } = useGetServiceSearchFiltersQuery(filter);
  const {
    data: _treatments,
    isLoading: treatmentsIsLoading,
    isError: treatmentsIsError,
  } = useGetFilteredBeautyCenterTreatmentsQuery({ pagination });

  return (
    <div className="flex flex-col  md:flex-row gap-4 p-4">
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => { }}>
        <Formik initialValues={{}} onSubmit={() => { }}>
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
          <RecommendedBeautyCenterSearchList treatments={FAKE_TREATMENTS} />
          <Pagination controls={controls} />
        </SpinnerFallback>
      </div>
    </div>
  );
};
