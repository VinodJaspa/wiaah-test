import { FormatedSearchableFilter } from "api";
import React from "react";
import {
  Stepper,
  StepperContent,
  ResturantFindTableFilterDateDayComponent,
  DateInput,

  TimeInput,
  ResturantReplacableTimeComponent,
  AspectRatio,
  CalenderIcon,
  ClockIcon,
  PersonIcon,
  ResturantFindTableFilterStepperHeader,
} from "@UI";
import { FilterAndAddToArray } from "utils";
import { useTranslation } from "react-i18next";
export interface HealthCenterFindTableSteper { }

export const HealthCenterFindTableSteper: React.FC<
  HealthCenterFindTableSteper
> = ({ }) => {
const { t } = useTranslation();
  const [filters, setFilters] = React.useState<FormatedSearchableFilter[]>([]);

  return (
    <Stepper>
      {({
        currentStepIdx,
        nextStep,
        previousStep,
        setStepsLength,
        stepsLength,
      }) => {
        return (
          <div className="flex flex-col gap-4 w-full">
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
                
              ]}
            />
            <StepperContent>
              <DateInput
                value={[]}
                dayComponent={ResturantFindTableFilterDateDayComponent}
                onDaySelect={(date) => {
                  if (!date) return;
                  setFilters((state) => {
                    const filteredState = FilterAndAddToArray(
                      state,
                      {
                        reservationDate: date,
                      },
                      "exclude",
                      "reservationDate",
                    );
                    return filteredState;
                  });
                  nextStep();
                }}
              />
              <TimeInput
                timeRange={{
                  from: { hour: 8, minutes: 0 },
                  to: { hour: 17, minutes: 30 },
                }}
                timeComponent={ResturantReplacableTimeComponent as React.FC}
                onTimeSelect={(time) => {
                  setFilters((state) => {
                    const filteredState = FilterAndAddToArray(
                      state,
                      {
                        reservationTime: `${time.hour}:${time.minutes}`,
                      },
                      "exclude",
                      "reservationTime",
                    );
                    return filteredState;
                  });
                  nextStep();
                }}
              />
          
            </StepperContent>
            <div className="flex justify-end items-center">
              <button
                className="px-4 py-2 bg-gray-200 w-fit text-semibold"
                onClick={previousStep}
              >
                {t("Previous")}
              </button>
            </div>
          </div>
        );
      }}
    </Stepper>
  );
};
