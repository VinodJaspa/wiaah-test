import React from "react";

function getPositionX(event: any) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}
function getPositionY(event: any) {
  return event.type.includes("mouse") ? event.pageY : event.touches[0].clientY;
}
function getElementDimensions(ref: any) {
  const width = ref.current?.clientWidth;
  const height = ref.current?.clientHeight;
  return { width, height };
}

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
      className={"flex items-center justify-center select-none h-full"}
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

export interface DraggableSliderProps {
  vertical: boolean;
  children: React.ReactNode;
  onSlideComplete?: (currIdx: number) => any;
  onSlideStart?: (currIdx: number) => any;
  activeIndex?: number | null;
  threshHold?: number;
  transition?: number;
  scaleOnDrag?: boolean;
  itemsCount?: number;
  gap?: number;
}

export const DraggableSlider: React.FC<DraggableSliderProps> = ({
  children,
  onSlideComplete,
  onSlideStart,
  activeIndex = null,
  threshHold = 200,
  transition = 0.3,
  scaleOnDrag = false,
  itemsCount = 2,
  vertical,
  gap = 0,
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
    (w = vertical ? dimensions.height : dimensions.width) => {
      currentTranslate.current = currentIndex.current * -w;
      prevTranslate.current = currentTranslate.current;
      setSliderPosition();
    },
    [dimensions.width, dimensions.height]
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

    setPositionByIndex(
      vertical
        ? getElementDimensions(sliderRef).height
        : getElementDimensions(sliderRef).width
    );
  }, [vertical]);

  // add event listeners
  React.useEffect(() => {
    // set width if window resizes
    const handleResize = () => {
      transitionOff();
      const { width, height } = getElementDimensions(sliderRef);
      setDimensions({ width, height });
      setPositionByIndex(vertical ? height : width);
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
    // @ts-ignore
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      // @ts-ignore
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [children, setPositionByIndex, onSlideComplete, onSlideStart]);

  function touchStart(index: number) {
    return function (event: React.MouseEvent | React.TouchEvent) {
      transitionOn();
      currentIndex.current = index;
      startPos.current = vertical ? getPositionY(event) : getPositionX(event);
      dragging.current = true;

      animationRef.current = requestAnimationFrame(animation);

      sliderRef.current ? (sliderRef.current.style.cursor = "grabbing") : null;
      // if onSlideStart prop - call it
      if (onSlideStart) onSlideStart(currentIndex.current);
    };
  }

  function touchMove(event: React.MouseEvent | React.TouchEvent) {
    if (dragging.current) {
      const currentPosition = vertical
        ? getPositionY(event)
        : getPositionX(event);
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
      ? (sliderRef.current.style.transform = `translate${
          vertical ? "Y" : "X"
        }(${
          currentTranslate.current +
          -(currentIndex.current === 0 ? 0 : gap * currentIndex.current)
        }px)`)
      : null;
  }

  return (
    <div className="overflow-hidden w-full h-full">
      <div
        style={{
          willChange: "transform, scale",
          flexDirection: vertical ? "column" : "row",
          gap: `${gap}px`,
        }}
        ref={sliderRef}
        className="w-full h-full inline-flex cursor-grab"
      >
        {Array.isArray(children)
          ? children.map((child, index) => {
              return (
                <div
                  key={`${child.key || ""}-${index}`}
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
