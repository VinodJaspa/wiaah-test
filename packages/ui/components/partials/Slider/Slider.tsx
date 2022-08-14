import React from "react";
import { HtmlDivProps } from "types";
import { setTestid, runIfFn } from "utils";
import { DraggableSlider } from "ui";

export type SliderVariants = "vertical" | "horizontal";

export interface SliderProps {
  itemsCount?: number;
  childsWrapperProps?: HtmlDivProps;
  leftArrowComponent?: React.ReactNode;
  rightArrowComponent?: React.ReactNode;
  downArrowComponent?: React.ReactNode;
  upArrowComponent?: React.ReactNode;
  variant?: SliderVariants;
  gap?: number;
  arrowLeftProps?: HtmlDivProps;
  arrowRightProps?: HtmlDivProps;
  containerProps?: HtmlDivProps;
  currentItemIdx?: number;
  onSliderChange?: (currentIdx: number, visibleItemsIdx: number[]) => any;
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
  arrowLeftProps,
  arrowRightProps,
  containerProps,
  currentItemIdx,
  onSliderChange,
}) => {
  const [currComponent, setCurrComponent] = React.useState<number>(0);
  const childrenCount = React.Children.count(children);
  const sliderWidth = (100 * childrenCount) / itemsCount;

  React.useEffect(() => {
    if (onSliderChange) {
      onSliderChange(
        currComponent,
        [...Array(itemsCount)].map((_, i) => currComponent + i)
      );
    }
  }, [currComponent]);

  React.useEffect(() => {
    if (typeof currentItemIdx === "number") {
      setCurrComponent(currentItemIdx);
    }
  }, [currentItemIdx]);

  function handlePrev() {
    setCurrComponent((state) => {
      const nextRunState = state - 1;
      return nextRunState < 0 ? 0 : nextRunState;
    });
  }

  function handleNext() {
    console.log("next");
    setCurrComponent((state) => {
      const nextRunState = state + 1;
      return nextRunState > childrenCount - itemsCount
        ? childrenCount - itemsCount
        : nextRunState;
    });
  }

  const itemWidth = sliderWidth / itemsCount;

  return (
    <div
      {...containerProps}
      className={`${containerProps?.className || ""} relative w-full h-full `}
    >
      <DraggableSlider
        gap={gap}
        vertical={variant === "vertical"}
        activeIndex={currComponent}
        onSlideComplete={(idx) => setCurrComponent(idx)}
      >
        {children}
      </DraggableSlider>
      <div
        onClick={() => handlePrev()}
        {...setTestid("SliderPreviousItemBtn")}
        {...arrowLeftProps}
        className={`${
          arrowLeftProps?.className || ""
        } absolute left-0 top-1/2 -translate-y-1/2`}
      >
        {runIfFn(leftArrowComponent)}
      </div>
      <div
        onClick={() => handleNext()}
        {...setTestid("SliderNextItemBtn")}
        {...arrowRightProps}
        className={`${
          arrowRightProps?.className || ""
        } absolute right-0 top-1/2 -translate-y-1/2`}
      >
        {runIfFn(rightArrowComponent)}
      </div>
    </div>
  );
};
