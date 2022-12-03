import { FormatedSearchableFilter } from "api";
import React from "react";
import {
  Stepper,
  StepperContent,
  ResturantFindTableFilterDateDayComponent,
  DateInput,
  ServiceBookingStepperHeader,
  TimeInput,
  ResturantReplacableTimeComponent,
  AspectRatio,
} from "ui";
import { FilterAndAddToArray } from "utils";
export interface ServiceBookingStepper {
  steps: {
    name: string;
    icon: React.ReactNode;
    component: React.ReactNode;
  }[];
}

export const ServiceBookingStepper: React.FC<ServiceBookingStepper> = ({
  steps,
}) => {
  const [filters, setFilters] = React.useState<FormatedSearchableFilter[]>([]);

  return (
    <Stepper>
      {({ currentStepIdx, nextStep }) => {
        return (
          <div className="flex flex-col gap-4 w-full">
            <ServiceBookingStepperHeader
              currentStepIdx={currentStepIdx}
              steps={steps.map((step) => ({
                name: step.name,
                icon: step.icon,
              }))}
            />
            <StepperContent>
              <DateInput
                className="w-[100%]"
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
                    nextStep();
                    return filteredState;
                  });
                }}
              />
              {/* <div className="grid grid-cols-5  gap-2 h-fit w-full">
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
              </div> */}
            </StepperContent>
          </div>
        );
      }}
    </Stepper>
  );
};
