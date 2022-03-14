import { useEffect } from "@storybook/addons";
import React, { CSSProperties, FC, ReactElement } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export interface CarouselProps {
  components: ComponentDetails[];
  componentsPerView?: number;
  getCurrentComponent?: (component: number) => void;
}

export interface ComponentDetails {
  title: string;
  Component: ReactElement;
}

export const Carousel: FC<CarouselProps> = ({
  components,
  componentsPerView,
  getCurrentComponent,
}) => {
  const [styles, setStyles] = React.useState<CSSProperties>({});
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  console.log(components.length);
  React.useEffect(() => {
    setStyles((state) => ({
      ...state,
      transform: `translate(-${100 * currentComponent}%)`,
    }));
    if (getCurrentComponent) {
      getCurrentComponent(currentComponent);
    }
  }, [currentComponent]);

  // React.useEffect(() => {
  //   setStyles((state) => ({
  //     ...state,
  //     width: `${componentsPerView ? `${componentsPerView / 100}%` : "100%"}`,
  //   }));
  // }, []);

  console.log("compperview", componentsPerView);
  const handleNext = (maxLength: number) => {
    const offset =
      componentsPerView && componentsPerView > 0 ? componentsPerView : 1;
    if (currentComponent + 1 + offset > maxLength)
      return setCurrentComponent(0);
    setCurrentComponent((state) => state + 1);
  };

  const handlePrev = (maxLength: number) => {
    const offset =
      componentsPerView && componentsPerView > 0 ? componentsPerView : 1;
    if (currentComponent - 1 < 0)
      return setCurrentComponent(maxLength - offset);
    setCurrentComponent((state) => state - 1);
  };

  return (
    <div className="relative h-[24rem] w-full overflow-hidden bg-slate-400">
      <div
        onClick={() => handlePrev(components.length)}
        className="absolute top-1/2 left-8 z-50 -translate-y-1/2 cursor-pointer select-none rounded-full bg-black bg-opacity-50 p-2 text-white"
      >
        <FaArrowLeft />
      </div>
      <div className="relative h-full w-full p-1">
        <div className="h-full w-full overflow-hidden">
          <div
            style={{
              ...styles,
              width: `${
                componentsPerView ? `${100 / componentsPerView}%` : "100%"
              }`,
            }}
            className={`h-full transition-all duration-500`}
          >
            {components.map(({ Component, title }, i) => (
              <div
                style={{ left: `${100 * i}%` }}
                className={`absolute top-1/2 flex h-auto w-full -translate-y-1/2 items-center justify-center px-2`}
              >
                {Component}
                <div className="absolute bottom-0 w-full px-2 text-white">
                  <div className="bg-black bg-opacity-40 px-8 py-2">
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        onClick={() => handleNext(components.length)}
        className="absolute top-1/2 right-8 z-50 -translate-y-1/2 cursor-pointer select-none rounded-full bg-black bg-opacity-50 p-2 text-white"
      >
        <FaArrowRight />
      </div>
    </div>
  );
};
