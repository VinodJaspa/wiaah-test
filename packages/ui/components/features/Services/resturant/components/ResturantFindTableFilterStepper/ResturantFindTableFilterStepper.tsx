import { FormatedSearchableFilter } from "api";
import React from "react";
import {
  Stepper,
  StepperContent,
  ResturantFindTableFilterDateDayComponent,
  DateInput,
  ResturantFindTableFilterStepperHeader,
  TimeInput,
  ResturantReplacableTimeComponent,
  AspectRatio,
  CalenderIcon,
  ClockIcon,
  PersonIcon,
} from "@UI";
import { FilterAndAddToArray } from "utils";
import { useTranslation } from "react-i18next";
export interface ResturantFindTableFilterStepper { }

export const ResturantFindTableFilterStepper: React.FC<
  ResturantFindTableFilterStepper
> = ({ }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
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
                {
                  icon: <PersonIcon />,
                  name: t("Guests"),
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
              <div className="grid grid-cols-5  gap-2 h-fit w-full">
                {[...Array(5)].map((_, i) => {
                  return (
                    <div className="w-full">
                      <AspectRatio ratio={1}>
                        <div className="flex h-full justify-center items-center bg-gray-200 rounded">
                          {i + 1}
                        </div>
                      </AspectRatio>
                    </div>
                  );
                })}
              </div>
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
