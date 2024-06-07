import { Form, Formik } from "formik";
import { useResponsive } from "hooks";
import React from "react";
import {
  DateInput,
  HealthCenterServiceSearchResultsList,
  SearchFilter,
  useGetHealthCenterFiltersQuery,
  ResturantFindTableFilterDateDayComponent,
  HealthCenterSearchBox,
  ServicesSearchResultsFiltersSidebar,
  Stepper,
  TimeInput,
  ResturantReplacableTimeComponent,
  ResturantFindTableFilterStepperHeader,
  StepperHeader,
  StepperContent,
  DisplayFoundServices,
  useSearchFilters,
  useGetFilteredHealthCenters,
  usePaginationControls,
  Pagination,
  SpinnerFallback,
  CalenderIcon,
  ClockIcon,
  PersonIcon,
} from "ui";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";

export const HealthCenterSearchResultsView: React.FC = () => {
  const { data: res, isLoading, isError } = useGetHealthCenterFiltersQuery();
  const { getLocationFilterQuery } = useSearchFilters();
  const { isTablet } = useResponsive();
  const { pagination, controls } = usePaginationControls();
  const {
    data,
    isLoading: healthIsLoading,
    isError: healthIsError,
  } = useGetFilteredHealthCenters({ pagination });
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <HealthCenterSearchBox />
      <div className={`${isTablet ? "flex-col" : "flex-row"} flex gap-4`}>
        <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({ setFieldValue, values }) => {
              return (
                <Form className="flex flex-col ">
                  <Stepper>
                    {({ currentStepIdx, nextStep }) => (
                      <>
                        <StepperHeader>
                          <ResturantFindTableFilterStepperHeader
                            currentStepIdx={currentStepIdx}
                            steps={[
                              {
                                icon: <CalenderIcon />,
                                name: t("Date"),
                              },
                              {
                                icon: <ClockIcon />,
                                name: t("Time"),
                              },
                              {
                                icon: <PersonIcon />,
                                name: t("Guests"),
                              },
                            ]}
                          />
                        </StepperHeader>
                        <StepperContent>
                          <DateInput
                            className="w-[100%]"
                            dayComponent={
                              ResturantFindTableFilterDateDayComponent
                            }
                            onDaySelect={() => {
                              nextStep();
                            }}
                          />
                          <TimeInput
                            timeRange={{
                              from: { hour: 0, minutes: 0 },
                              to: { hour: 24, minutes: 0 },
                            }}
                            timeComponent={ResturantReplacableTimeComponent}
                          />
                        </StepperContent>
                      </>
                    )}
                  </Stepper>
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
        <div className="flex flex-col">
          <DisplayFoundServices
            location={getLocationFilterQuery || ""}
            servicesNum={randomNum(500)}
          />
          <SpinnerFallback isLoading={healthIsLoading} isError={healthIsError}>
            <HealthCenterServiceSearchResultsList doctors={data} />
          </SpinnerFallback>
          <Pagination controls={controls} />
        </div>
      </div>
    </div>
  );
};
