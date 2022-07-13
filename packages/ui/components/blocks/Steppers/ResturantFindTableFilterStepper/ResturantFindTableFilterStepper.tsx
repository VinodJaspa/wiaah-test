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
} from "ui";
import { FilterAndAddToArray } from "utils";
export interface ResturantFindTableFilterStepper {}

export const ResturantFindTableFilterStepper: React.FC<
  ResturantFindTableFilterStepper
> = ({}) => {
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
          <div className="flex flex-col w-full">
            <ResturantFindTableFilterStepperHeader
              currentStepIdx={currentStepIdx}
            />
            <StepperContent>
              <DateInput
                dayComponent={ResturantFindTableFilterDateDayComponent}
                onDaySelect={(date) => {
                  setFilters((state) => {
                    const filteredState = FilterAndAddToArray(
                      state,
                      {
                        reservationDate: date,
                      },
                      "exclude",
                      "reservationDate"
                    );
                    return filteredState;
                  });
                  nextStep();
                }}
              />
              <TimeInput
                timeRange={{
                  from: { hour: 8, minutes: 30 },
                  to: { hour: 16, minutes: 30 },
                }}
                timeComponent={ResturantReplacableTimeComponent}
                onTimeSelect={(time) => {
                  setFilters((state) => {
                    const filteredState = FilterAndAddToArray(
                      state,
                      {
                        reservationTime: `${time.hour}:${time.minutes}`,
                      },
                      "exclude",
                      "reservationTime"
                    );
                    return filteredState;
                    nextStep();
                  });
                }}
              />
              <DateInput
                dayComponent={ResturantFindTableFilterDateDayComponent}
                onDaySelect={(date) => {
                  setFilters((state) => {
                    const filteredState = FilterAndAddToArray(
                      state,
                      {
                        reservationDate: date,
                      },
                      "exclude",
                      "reservationDate"
                    );
                    return filteredState;
                  });
                  nextStep();
                  console.log("day selected", date, currentStepIdx);
                }}
              />
            </StepperContent>
          </div>
        );
      }}
    </Stepper>
  );
};
