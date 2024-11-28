import React from "react";
import { HtmlDivProps } from "types";
import { setTestid, runIfFn } from "utils";
import { DraggableSlider } from "@UI";

export type SliderVariants = "vertical" | "horizontal";

export interface SliderProps {
  itemsCount?: number;
  className?: string;
  childsWrapperProps?: HtmlDivProps;
  leftArrowComponent?: React.ReactNode | React.FC;
  rightArrowComponent?: React.ReactNode | React.FC;
  downArrowComponent?: React.ReactNode;
  upArrowComponent?: React.ReactNode;
  variant?: SliderVariants;
  gap?: number;
  arrowLeftProps?: HtmlDivProps;
  arrowRightProps?: HtmlDivProps;
  containerProps?: HtmlDivProps;
  currentItemIdx?: number;
  draggingActive?: boolean;
  keepLast?: boolean;
  onSliderChange?: (currentIdx: number, visibleItemsIdx: number[]) => any;
  children: React.ReactNode;
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
  draggingActive,
  keepLast,
  className,
}) => {
  const childrenCount = Array.isArray(children)
    ? children.filter((c) => !!c).length
    : 0;

  const [currComponent, setCurrComponent] = React.useState<number>(0);

  // const sliderWidth = (100 * childrenCount) / itemsCount;

  React.useEffect(() => {
    if (onSliderChange) {
      onSliderChange(
        currComponent,
        [...Array(itemsCount)].map((_, i) => currComponent + i),
      );
    }
  }, [currComponent]);

  React.useEffect(() => {
    if (typeof currentItemIdx === "number") {
      setCurrComponent(currentItemIdx);
    }
  }, [currentItemIdx]);

  React.useEffect(() => {
    if (keepLast) {
      setCurrComponent(childrenCount - 1);
    }
  }, [children]);

  function handlePrev() {
    setCurrComponent((state) => Math.max(state - 1, 0)); // Prevent going below 0
  }

  function handleNext() {
    setCurrComponent((state) =>
      Math.min(state + 1, childrenCount - itemsCount),
    ); // Prevent exceeding bounds
  }

  // const itemWidth = sliderWidth / itemsCount;

  return (
    <div
      {...containerProps}
      className={`${containerProps?.className || ""} relative w-full h-full `}
    >
      <DraggableSlider
        itemsCount={itemsCount}
        draggingActive={draggingActive}
        gap={gap}
        vertical={variant === "vertical"}
        activeIndex={currComponent}
        onSlideComplete={(idx) => setCurrComponent(idx)}
      >
        {Array.isArray(children) ? children.filter((c) => !!c) : children}
      </DraggableSlider>
      <div
        onClick={() => handlePrev()}
        {...setTestid("SliderPreviousItemBtn")}
        {...arrowLeftProps}
        className={`${arrowLeftProps?.className || ""
          } absolute left-0 top-1/2 -translate-y-1/2`}
      >
        {runIfFn(leftArrowComponent)}
      </div>
      <div
        onClick={() => handleNext()}
        {...setTestid("SliderNextItemBtn")}
        {...arrowRightProps}
        className={`${arrowRightProps?.className || ""
          } absolute right-0 top-1/2 -translate-y-1/2`}
      >
        {runIfFn(rightArrowComponent)}
      </div>
    </div>
  );
};
