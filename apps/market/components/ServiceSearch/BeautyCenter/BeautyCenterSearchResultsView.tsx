import { FormatedSearchableFilter } from "api";
import { Formik, Form } from "formik";
import React from "react";
import {
  AspectRatio,
  DateInput,
  RecommendedBeautyCenterSearchList,
  ResturantFindTableFilterDateDayComponent,
  ResturantFindTableFilterStepper,
  ResturantFindTableFilterStepperHeader,
  ResturantReplacableTimeComponent,
  ResturantSearchList,
  SearchFilter,
  ServicesSearchResultsFiltersSidebar,
  Stepper,
  StepperContent,
  TimeInput,
  useGetServiceSearchFiltersQuery,
  useSearchFilters,
} from "ui";
import { FilterAndAddToArray } from "utils";

export const BeautyCenterSearchResultsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const { data, isLoading, isError } = useGetServiceSearchFiltersQuery(filters);
  const [_, setFilters] = React.useState<FormatedSearchableFilter[]>([]);
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ setFieldValue, values }) => {
            return (
              <Form className="flex flex-col">
                <ResturantFindTableFilterStepper />

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
      <RecommendedBeautyCenterSearchList />
    </div>
  );
};
