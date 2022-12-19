import React from "react";
import { ArrowRightIcon, TriangleRightIcon } from "@UI";
import { runIfFn } from "utils";

type ServiceBookingStepperStepType = { icon: React.ReactNode; name: string };

export interface ServiceBookingStepperHeaderProps {
  currentStepIdx: number;
  steps: ServiceBookingStepperStepType[];
}

export const ServiceBookingStepperHeader: React.FC<
  ServiceBookingStepperHeaderProps
> = ({ currentStepIdx = 0, steps }) => {
  return (
    <div className="relative overflow-hidden h-8 flex items-center w-full">
      <div className="absolute z-[1] items-center justify-evenly w-full flex ">
        {Array.isArray(steps)
          ? steps.map(({ icon, name }, i) => (
              <React.Fragment key={i}>
                <div
                  className={`${
                    currentStepIdx >= i ? "text-white" : ""
                  } flex items-center gap-2`}
                >
                  <span className="text-xl">
                    {currentStepIdx <= i ? runIfFn(icon, {}) : null}
                  </span>
                  {currentStepIdx >= i ? <p>{name}</p> : null}
                </div>
                {i < steps.length - 1 ? (
                  <ArrowRightIcon
                    className={`${currentStepIdx === i ? "opacity-0" : ""} ${
                      currentStepIdx >= i ? "text-white" : ""
                    } text-3xl`}
                  />
                ) : null}
              </React.Fragment>
            ))
          : null}
      </div>
      <div
        style={{
          width: `${(100 / steps.length) * (currentStepIdx + 1)}%`,
        }}
        className="relative -z-0 text-primary bg-primary top-0 left-0 h-full"
      >
        <TriangleRightIcon className="absolute top-0 right-0 translate-x-[95%] bg-primary h-[calc(100%)] w-8" />
      </div>
    </div>
  );
};
