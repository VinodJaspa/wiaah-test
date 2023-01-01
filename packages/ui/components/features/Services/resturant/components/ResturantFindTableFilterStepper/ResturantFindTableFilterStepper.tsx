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
} from "@UI";
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
          <div className="flex flex-col gap-4 w-full">
            <ResturantFindTableFilterStepperHeader
              currentStepIdx={currentStepIdx}
            />
            <StepperContent>
              <DateInput
                className="w-[100%]"
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
                      "reservationDate"
                    );
                    return filteredState;
                  });
                  // nextStep();
                  // nextStep();
                }}
              />
              <TimeInput
                timeRange={{
                  from: { hour: 8, minutes: 0 },
                  to: { hour: 17, minutes: 30 },
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
                    // nextStep();
                    return filteredState;
                  });
                }}
              />
              <div className="grid grid-cols-5  gap-2 h-fit w-full">
                {[...Array(20)].map((_, i) => {
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
          </div>
        );
      }}
    </Stepper>
  );
};
