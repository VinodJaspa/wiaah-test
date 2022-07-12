import { FormatedSearchableFilter } from "api";
import React from "react";
import {
  Stepper,
  StepperContent,
  ResturantFindTableFilterDateDayComponent,
  DateInput,
} from "ui";
import { FilterAndAddToArray } from "utils";
import { ResturantFindTableFilterStepperHeader } from "../Headers";
export interface ResturantFindTableFilterStepper {}

const ResturantFindTableFilterSteps = [];

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
          <div className="flex flex-col">
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
                  console.log("day selected", date, currentStepIdx);
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
