import React from "react";
import { runIfFn } from "utils";

export type SliderVariants = "vertical" | "horizontal";

export interface SliderProps {
  itemsCount?: number;
  leftArrowComponent?: React.ReactNode;
  rightArrowComponent?: React.ReactNode;
  downArrowComponent?: React.ReactNode;
  upArrowComponent?: React.ReactNode;
  variant?: SliderVariants;
  gap?: number;
}

export const Slider: React.FC<SliderProps> = ({
  itemsCount = 1,
  leftArrowComponent = null,
  rightArrowComponent = null,
  downArrowComponent = null,
  upArrowComponent = null,
  variant,
  gap = 0,
  children,
}) => {
  const [currComponent, setCurrComponent] = React.useState<number>(0);
  const childrenCount = React.Children.count(children);
  const sliderWidth = (100 * childrenCount) / itemsCount;

  function handlePrev() {
    setCurrComponent((state) => {
      const nextRunState = state - 1;
      return nextRunState < 0 ? 0 : nextRunState;
    });
  }

  function handleNext() {
    setCurrComponent((state) => {
      const nextRunState = state + 1;
      return nextRunState > childrenCount - itemsCount
        ? childrenCount - itemsCount
        : nextRunState;
    });
  }

  const itemWidth = sliderWidth / itemsCount;

  switch (variant) {
    case "vertical":
      return (
        <div className="relative w-full h-full overflow-hidden">
          <div
            style={{
              height: `calc(${sliderWidth}% + (${childrenCount} * ${gap}px))`,
              gap: `${gap}px`,
              transform: `translateY(-${
                currComponent * (100 / childrenCount)
              }% )`,
            }}
            className="absolute transition-transform top-0 left-0 w-full flex flex-col "
          >
            {React.Children.map(children, (child) => {
              return (
                <div
                  style={{ height: `calc(${itemWidth}% - ${gap}px)` }}
                  className="w-full"
                >
                  {child}
                </div>
              );
            })}
          </div>
          <div
            onClick={() => handlePrev()}
            className="absolute left-1/2 top-0 -translate-x-1/2"
          >
            {runIfFn(upArrowComponent)}
          </div>
          <div
            onClick={() => handleNext()}
            className="absolute left-1/2 bottom-0 -translate-x-1/2"
          >
            {runIfFn(downArrowComponent)}
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full overflow-hidden">
          <div
            style={{
              width: `calc(${sliderWidth}%)`,
              gap: `${gap}px`,
              transform: `translateX(-${
                currComponent * (100 / childrenCount)
              }% )`,
            }}
            className="transition-transform top-0 left-0 h-full flex"
          >
            {React.Children.map(children, (child) => {
              return (
                <div
                  style={{ width: `calc(${itemWidth}% - ${gap}px)` }}
                  className="h-full"
                >
                  {child}
                </div>
              );
            })}
          </div>
          <div
            onClick={() => handlePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            {runIfFn(leftArrowComponent)}
          </div>
          <div
            onClick={() => handleNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            {runIfFn(rightArrowComponent)}
          </div>
        </div>
      );
  }
};
