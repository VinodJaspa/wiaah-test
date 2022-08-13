import React from "react";
import { HtmlDivProps } from "types";
import { setTestid, runIfFn } from "utils";
import { useDrag } from "hooks";

// export type SliderVariants = "vertical" | "horizontal";

// export interface SliderProps {
//   itemsCount?: number;
//   childsWrapperProps?: HtmlDivProps;
//   leftArrowComponent?: React.ReactNode;
//   rightArrowComponent?: React.ReactNode;
//   downArrowComponent?: React.ReactNode;
//   upArrowComponent?: React.ReactNode;
//   variant?: SliderVariants;
//   gap?: number;
//   arrowLeftProps?: HtmlDivProps;
//   arrowRightProps?: HtmlDivProps;
//   containerProps?: HtmlDivProps;
//   currentItemIdx?: number;
//   onSliderChange?: (currentIdx: number, visibleItemsIdx: number[]) => any;
// }

// export const Slider: React.FC<SliderProps> = ({
//   itemsCount = 1,
//   leftArrowComponent = null,
//   rightArrowComponent = null,
//   downArrowComponent = null,
//   upArrowComponent = null,
//   variant,
//   gap = 0,
//   children,
//   arrowLeftProps,
//   arrowRightProps,
//   childsWrapperProps,
//   containerProps,
//   currentItemIdx,
//   onSliderChange,
// }) => {
//   const [currComponent, setCurrComponent] = React.useState<number>(0);
//   const childrenCount = React.Children.count(children);
//   const sliderWidth = (100 * childrenCount) / itemsCount;

//   const childsPoints = React.useMemo(
//     () => [...Array(childrenCount)].map((_, i) => i * (100 / childrenCount)),
//     [childrenCount]
//   );

//   const translate = React.useMemo(
//     () => currComponent * (100 / childrenCount),
//     [currComponent, childrenCount]
//   );

//   React.useEffect(() => {
//     if (onSliderChange) {
//       onSliderChange(
//         currComponent,
//         [...Array(itemsCount)].map((_, i) => currComponent + i)
//       );
//     }
//   }, [currComponent]);

//   React.useEffect(() => {
//     if (typeof currentItemIdx === "number") {
//       setCurrComponent(currentItemIdx);
//     }
//   }, [currentItemIdx]);

//   function handlePrev() {
//     setCurrComponent((state) => {
//       const nextRunState = state - 1;
//       return nextRunState < 0 ? 0 : nextRunState;
//     });
//   }

//   function handleNext() {
//     setCurrComponent((state) => {
//       const nextRunState = state + 1;
//       return nextRunState > childrenCount - itemsCount
//         ? childrenCount - itemsCount
//         : nextRunState;
//     });
//   }

//   const itemWidth = sliderWidth / itemsCount;

//   switch (variant) {
//     case "vertical":
//       return (
//         <div className="relative w-full h-full overflow-hidden">
//           <div
//             style={{
//               height: `calc(${sliderWidth}% + (${childrenCount} * ${gap}px))`,
//               gap: `${gap}px`,
//               transform: `translateY(-${
//                 currComponent * (100 / childrenCount)
//               }% )`,
//             }}
//             className="absolute transition-transform top-0 left-0 w-full flex flex-col "
//           >
//             {React.Children.map(children, (child) => {
//               return (
//                 <div
//                   style={{ height: `calc(${itemWidth}% - ${gap}px)` }}
//                   className="w-full"
//                 >
//                   {child}
//                 </div>
//               );
//             })}
//           </div>
//           <div
//             onClick={() => handlePrev()}
//             className="absolute left-1/2 top-0 -translate-x-1/2"
//           >
//             {runIfFn(upArrowComponent)}
//           </div>
//           <div
//             onClick={() => handleNext()}
//             className="absolute left-1/2 bottom-0 -translate-x-1/2"
//           >
//             {runIfFn(downArrowComponent)}
//           </div>
//         </div>
//       );

//     default:
//       return (
//         <div
//           {...containerProps}
//           className={`${
//             containerProps?.className || ""
//           } relative w-full h-full overflow-hidden`}
//         >
//           <SliderItemsContainer
//             childsPoints={childsPoints}
//             gapPx={gap}
//             props={childsWrapperProps}
//             translate={translate}
//             widthPercent={sliderWidth}
//           >
//             {React.Children.map(children, (child) => {
//               return (
//                 <div
//                   style={{ width: `calc(${itemWidth}% - ${gap}px)` }}
//                   className="h-full pointer-events-none"
//                 >
//                   {child}
//                 </div>
//               );
//             })}
//           </SliderItemsContainer>
//           <div
//             onClick={() => handlePrev()}
//             {...setTestid("SliderPreviousItemBtn")}
//             {...arrowLeftProps}
//             className={`${
//               arrowLeftProps?.className || ""
//             } absolute left-0 top-1/2 -translate-y-1/2`}
//           >
//             {runIfFn(leftArrowComponent)}
//           </div>
//           <div
//             onClick={() => handleNext()}
//             {...setTestid("SliderNextItemBtn")}
//             {...arrowRightProps}
//             className={`${
//               arrowRightProps?.className || ""
//             } absolute right-0 top-1/2 -translate-y-1/2`}
//           >
//             {runIfFn(rightArrowComponent)}
//           </div>
//         </div>
//       );
//   }
// };

// interface SliderItemsContainerProps {
//   widthPercent: number;
//   props?: HtmlDivProps;
//   translate: number;
//   gapPx: number;
//   childsPoints: number[];
// }
// const SliderItemsContainer: React.FC<SliderItemsContainerProps> = ({
//   props,
//   translate,
//   widthPercent,
//   gapPx,
//   childsPoints,
//   children,
// }) => {
//   const [x, setX] = React.useState<number>(0);
//   const dragRef = useDrag({
//     onDrag(x, y, xDiff, yDiff) {
//       setX(xDiff / childsPoints.length);
//     },
//     onDragEnd(x, y, velocityX, velocityY, dateDiff) {
//       handleDragEnd(x, velocityX);
//     },
//   });

//   function handleDragEnd(diff: number, velocity: number) {
//     console.log(translate, translate + diff, childsPoints);
//   }

//   return (
//     <div
//       ref={dragRef}
//       style={{
//         width: `calc(${widthPercent}%)`,
//         gap: `${gapPx}px`,
//         transform: `translateX(-${translate + x}% )`,
//         ...props?.style,
//       }}
//       className={`${
//         props?.className || ""
//       } transition-transform top-0 left-0 h-full flex`}
//     >
//       {children}
//     </div>
//   );
// };

export function getPositionX(event: any) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

export function getElementDimensions(ref: any) {
  const width = ref.current?.clientWidth;
  const height = ref.current?.clientHeight;
  return { width, height };
}

// const SlideStyles = styled.div`
//   transition: transform 0.2s ease-out;
//   div {
//     padding: 1rem;
//     height: 100%;
//     width: ${(props) => props.sliderWidth};
//     height: ${(props) => props.sliderHeight};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     user-select: none;
//   }
//   img {
//     max-width: 100%;
//     max-height: 100%;
//   }
// `

export interface SlideProps {
  child: React.ReactNode;
  sliderWidth: number;
  sliderHeight: number;
  scaleOnDrag: boolean;
}

export const Slide: React.FC<SlideProps> = ({
  child,
  sliderWidth,
  sliderHeight,
  scaleOnDrag = false,
}) => {
  const slideRef = React.useRef<HTMLDivElement>(null);

  const onMouseDown = () => {
    if (scaleOnDrag && slideRef.current)
      slideRef.current.style.transform = "scale(0.9)";
  };

  const onMouseUp = () => {
    if (scaleOnDrag && slideRef.current)
      slideRef.current.style.transform = "scale(1)";
  };
  return (
    <div
      ref={slideRef}
      style={{
        width: `${sliderWidth}px`,
        height: `${sliderHeight}px`,
      }}
      className={"flex items-center justify-center select-none p-4 h-full"}
    >
      <div
        unselectable="on"
        className="w-full h-full"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onMouseLeave={onMouseUp}
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
      >
        {child}
      </div>
    </div>
  );
};

// const SliderStyles = styled.div`
//   all: initial;
//   width: 100%;
//   height: 100%;
//   max-height: 100vh;
//   display: inline-flex;
//   will-change: transform, scale;
//   cursor: grab;
//   .slide-outer {
//     display: flex;
//     align-items: center;
//   }
// `

// const SliderWrapper = styled.div`
//   overflow: hidden;
//   width: 100%;
//   height: 100%;
//   max-height: 100vh;
// `

export interface DraggableSliderProps {
  children: React.ReactNode;
  onSlideComplete: (currIdx: number) => any;
  onSlideStart: (currIdx: number) => any;
  activeIndex: number | null;
  threshHold: number;
  transition: number;
  scaleOnDrag: boolean;
  itemsCount: number;
}

export const DraggableSlider: React.FC<DraggableSliderProps> = ({
  children,
  onSlideComplete,
  onSlideStart,
  activeIndex = null,
  threshHold = 100,
  transition = 0.3,
  scaleOnDrag = false,
  itemsCount = 2,
}) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const dragging = React.useRef(false);
  const startPos = React.useRef(0);
  const currentTranslate = React.useRef<number>(0);
  const prevTranslate = React.useRef<number>(0);
  const currentIndex = React.useRef(activeIndex || 0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const animationRef = React.useRef<number>();

  const setPositionByIndex = React.useCallback(
    (w = dimensions.width) => {
      currentTranslate.current = currentIndex.current * -w;
      prevTranslate.current = currentTranslate.current;
      setSliderPosition();
    },
    [dimensions.width]
  );

  const transitionOn = () =>
    sliderRef.current
      ? (sliderRef.current.style.transition = `transform ${transition}s ease-out`)
      : null;

  const transitionOff = () =>
    sliderRef.current ? (sliderRef.current.style.transition = "none") : null;

  // watch for a change in activeIndex prop
  React.useEffect(() => {
    if (activeIndex !== currentIndex.current) {
      transitionOn();
      currentIndex.current && activeIndex
        ? (currentIndex.current = activeIndex)
        : undefined;
      setPositionByIndex();
    }
  }, [activeIndex, setPositionByIndex]);

  // set width after first render
  // set position by startIndex
  // no animation on startIndex
  React.useLayoutEffect(() => {
    setDimensions(getElementDimensions(sliderRef));

    setPositionByIndex(getElementDimensions(sliderRef).width);
  }, [setPositionByIndex]);

  // add event listeners
  React.useEffect(() => {
    // set width if window resizes
    const handleResize = () => {
      transitionOff();
      const { width, height } = getElementDimensions(sliderRef);
      setDimensions({ width, height });
      setPositionByIndex(width);
    };

    const handleKeyDown = ({ key }: React.KeyboardEvent<Element>) => {
      const arrowsPressed = ["ArrowRight", "ArrowLeft"].includes(key);
      if (arrowsPressed) transitionOn();
      if (arrowsPressed && onSlideStart) {
        onSlideStart(currentIndex.current);
      }
      if (
        key === "ArrowRight" &&
        currentIndex.current <
          (Array.isArray(children) ? children.length - 1 : 0)
      ) {
        currentIndex.current += 1;
      }
      if (key === "ArrowLeft" && currentIndex.current > 0) {
        currentIndex.current -= 1;
      }
      if (arrowsPressed && onSlideComplete)
        onSlideComplete(currentIndex.current);
      setPositionByIndex();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [children, setPositionByIndex, onSlideComplete, onSlideStart]);

  function touchStart(index: number) {
    return function (event: React.MouseEvent | React.TouchEvent) {
      transitionOn();
      currentIndex.current = index;
      startPos.current = getPositionX(event);
      dragging.current = true;

      animationRef.current = requestAnimationFrame(animation);

      sliderRef.current ? (sliderRef.current.style.cursor = "grabbing") : null;
      // if onSlideStart prop - call it
      if (onSlideStart) onSlideStart(currentIndex.current);
    };
  }

  function touchMove(event: React.MouseEvent | React.TouchEvent) {
    if (dragging.current) {
      const currentPosition = getPositionX(event);
      currentTranslate.current =
        prevTranslate.current + currentPosition - startPos.current;
    }
  }

  function touchEnd() {
    transitionOn();
    cancelAnimationFrame(animationRef.current || 0);
    dragging.current = false;
    const movedBy = currentTranslate.current - prevTranslate.current;

    // if moved enough negative then snap to next slide if there is one
    if (
      movedBy < -threshHold &&
      currentIndex.current < (Array.isArray(children) ? children.length - 1 : 0)
    )
      currentIndex.current += 1;

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > threshHold && currentIndex.current > 0)
      currentIndex.current -= 1;

    transitionOn();

    setPositionByIndex();
    sliderRef.current ? (sliderRef.current.style.cursor = "grab") : null;
    // if onSlideComplete prop - call it
    if (onSlideComplete) onSlideComplete(currentIndex.current);
  }

  function animation() {
    setSliderPosition();
    if (dragging.current) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    sliderRef.current
      ? (sliderRef.current.style.transform = `translateY(${currentTranslate.current}px)`)
      : null;
  }

  return (
    <div className="overflow-hidden w-full h-full">
      <div
        style={{ willChange: "transform, scale" }}
        ref={sliderRef}
        className="w-full h-full inline-flex cursor-grab"
      >
        {Array.isArray(children)
          ? children.map((child, index) => {
              return (
                <div
                  key={child.key}
                  onTouchStart={touchStart(index)}
                  onMouseDown={touchStart(index)}
                  onTouchMove={touchMove}
                  onMouseMove={touchMove}
                  onTouchEnd={touchEnd}
                  onMouseUp={touchEnd}
                  onMouseLeave={() => {
                    if (dragging.current) touchEnd();
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className=""
                >
                  <Slide
                    child={child}
                    sliderWidth={dimensions.width}
                    sliderHeight={dimensions.height}
                    scaleOnDrag={scaleOnDrag}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
