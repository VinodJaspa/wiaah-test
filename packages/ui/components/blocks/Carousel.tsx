import { useEffect } from "@storybook/addons";
import React, { CSSProperties, FC, ReactElement, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export interface CarouselProps {
  children?: ReactElement[];
  componentsPerView?: number;
  getCurrentComponent?: (component: number) => void;
  auto?: {
    enable: boolean;
    speedInMs: number;
  };
  controls?: boolean;
  setCurrentComponentNum?: number;
}

export const Carousel: FC<CarouselProps> = ({
  children,
  componentsPerView,
  getCurrentComponent,
  auto,
  controls = true,
  setCurrentComponentNum,
}) => {
  const [styles, setStyles] = React.useState<CSSProperties>({});
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  const [translation, setTranslation] = React.useState<number>(
    100 * currentComponent
  );
  const [dragging, setDragging] = React.useState<boolean>(false);

  let autoMoveInterval: any;

  if (!children) return null;

  const handleNext = useCallback(() => {
    if (autoMoveInterval) {
      clearTimeout(autoMoveInterval);
    }
    const maxLength = children.length;
    const offset =
      componentsPerView && componentsPerView > 0 ? componentsPerView : 1;
    if (currentComponent + 1 + offset > maxLength)
      return setCurrentComponent(0);
    setCurrentComponent((state) => state + 1);
  }, [currentComponent]);

  const handlePrev = useCallback(() => {
    if (autoMoveInterval) {
      clearTimeout(autoMoveInterval);
    }
    const maxLength = children.length;
    const offset =
      componentsPerView && componentsPerView > 0 ? componentsPerView : 1;
    if (currentComponent - 1 < 0)
      return setCurrentComponent(maxLength - offset);
    setCurrentComponent((state) => state - 1);
  }, [currentComponent]);

  function handleMouseDragging(e: React.MouseEvent<HTMLDivElement>) {
    console.log();
    if (dragging) {
      console.log(e);
      // setTranslation(state => state+)
    }
  }

  React.useEffect(() => {
    if (setCurrentComponentNum || setCurrentComponentNum === 0) {
      setCurrentComponent(setCurrentComponentNum);
    }
  }, [setCurrentComponentNum]);

  React.useEffect(() => {
    setStyles((state) => ({
      ...state,
      transform: `translate(-${translation}%)`,
    }));
    // if (getCurrentComponent) {
    //   getCurrentComponent(currentComponent);
    // }
  }, [translation]);

  React.useEffect(() => {
    setTranslation(100 * currentComponent);
  }, [currentComponent]);

  React.useEffect(() => {
    if (!auto || !auto.enable) return;
    autoMoveInterval = setTimeout(() => {
      handleNext();
    }, auto.speedInMs);
  }, [currentComponent]);

  return (
    <div className="relative h-full w-full overflow-hidden ">
      {controls && (
        <div
          onClick={() => handlePrev()}
          className="absolute top-1/2 left-8 z-50 -translate-y-1/2 cursor-pointer select-none rounded-full bg-black bg-opacity-50 p-2 text-white"
        >
          <FaArrowLeft />
        </div>
      )}
      <div className="relative h-full w-full">
        <div className="h-full w-full overflow-hidden">
          <div
            onMouseDown={() => setDragging(true)}
            onMouseOver={handleMouseDragging}
            onMouseUp={() => setDragging(false)}
            style={{
              ...styles,
              width: `${
                componentsPerView ? `${100 / componentsPerView}%` : "100%"
              }`,
            }}
            className={`h-full transition-all duration-500`}
          >
            {children.map((Component, i) => (
              <div
                key={i}
                style={{ left: `${100 * i}%` }}
                className={`absolute top-1/2 flex h-full w-full -translate-y-1/2 items-center justify-center px-2`}
              >
                {Component}
              </div>
            ))}
          </div>
        </div>
      </div>
      {controls && (
        <div
          onClick={() => handleNext()}
          className="absolute top-1/2 right-8 z-50 -translate-y-1/2 cursor-pointer select-none rounded-full bg-black bg-opacity-50 p-2 text-white"
        >
          <FaArrowRight />
        </div>
      )}
    </div>
  );
};
