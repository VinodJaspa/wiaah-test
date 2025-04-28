import { DateInput, SearchFilter, TimeInput } from "../../../blocks/DataInput";
import { SpinnerFallback } from "../../../blocks/FallbackDisplays";
import { usePaginationControls } from "../../../blocks/Navigating";
import {
  DisplayFoundServices,
  HealthCenterSearchBox,
  HealthCenterServiceSearchResultsList,
  ResturantFindTableFilterStepperHeader,
  ServicesSearchResultsFiltersSidebar,
  useGetFilteredHealthCenters,
  useGetHealthCenterFiltersQuery,
} from "../../../features/Services";
import {
  CalenderIcon,
  ClockIcon,
  Pagination,
  PersonIcon,
  ResturantFindTableFilterDateDayComponent,
  ResturantReplacableTimeComponent,
  Stepper,
  StepperContent,
  StepperHeader,
} from "../../../partials";
import { useSearchFilters } from "../../../../src/Hooks";
import { Form, Formik } from "formik";
import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";

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
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <HealthCenterSearchBox />
      <div className={`${isTablet ? "flex-col" : "flex-row"} flex gap-4`}>
        <ServicesSearchResultsFiltersSidebar onShowOnMap={() => { }}>
          <Formik initialValues={{}} onSubmit={() => { }}>
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
                            
                            timeComponent={ResturantReplacableTimeComponent as React.FC}
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
            servicesNum={100}
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
