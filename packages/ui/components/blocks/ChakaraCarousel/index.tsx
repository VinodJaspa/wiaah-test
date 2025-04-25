import React, {
  useLayoutEffect,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
  ReactElement,
  ReactNode,
} from "react";



import { motion, PanInfo, useAnimation, useMotionValue } from "framer-motion";
import { DoubleChevronLeftIcon, DoubleChevronRightIcon } from "@partials";
import { useMediaQuery } from "react-responsive";
import { ShadcnFlex } from "@UI/components/shadcn-components";

const MotionFlex = motion.div;

const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3,
};

export interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement[];
  gap?: number;
  activeItem?: number;
  setActiveItem: (item: number) => any;
  onCurrentActiveChange?: (
    currentActive: number,
    currentActiveData?: any
  ) => any;
  trackBgColor?: string;
  arrows?: boolean;
  swipe?: boolean;
  navigateOnClick?: boolean;
  movementDirection?: "vertical" | "horizontal";
  trackStyle?: StackProps;
  onPassMaxLimit?: () => any;
  onPassMinLimit?: () => any;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  onCurrentActiveChange,
  gap = 0,
  activeItem = 0,
  setActiveItem,
  trackBgColor,
  arrows,
  swipe,
  navigateOnClick,
  movementDirection = "horizontal",
  trackStyle,
  onPassMaxLimit,
  onPassMinLimit,
  ...props
}) => {
  const [trackIsActive, setTrackIsActive] = React.useState(false);
  const [multiplier, setMultiplier] = React.useState(0.35);
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const [ActiveItem, SetActiveItem] = useState(0);
  const [constraint, setConstraint] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(0);

  React.useEffect(() => {
    SetActiveItem(activeItem);
  }, [activeItem]);

  React.useEffect(() => {
    setActiveItem && setActiveItem(ActiveItem);
  }, [ActiveItem]);

  const initSliderWidth = useCallback(
    (width: number) => setSliderWidth(width),
    []
  );

  const positions = useMemo(
    () =>
      children &&
      children.map((_, index) => -Math.abs((itemWidth + gap) * index)),
    [children, itemWidth, gap]
  );

  React.useEffect(() => {
    onCurrentActiveChange && onCurrentActiveChange(activeItem);
  }, [activeItem]);



  const isBetweenBaseAndMd = useMediaQuery({ minWidth: 320, maxWidth: 768 });
  const isBetweenMdAndXl = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isGreaterThanXL = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    setItemWidth(sliderWidth);
    setMultiplier(0.2);
    setConstraint(1);
    // if (isBetweenBaseAndMd) {
    //   setItemWidth(sliderWidth - gap);
    //   setMultiplier(0.65);
    //   setConstraint(1);
    // }
    // if (isBetweenMdAndXl) {
    //   setItemWidth(sliderWidth / 2 - gap);
    //   setMultiplier(0.5);
    //   setConstraint(2);
    // }
    // if (isGreaterThanXL) {
    //   setItemWidth(sliderWidth / 3 - gap);
    //   setMultiplier(0.35);
    //   setConstraint(3);
    // }
  }, [isBetweenBaseAndMd, isBetweenMdAndXl, isGreaterThanXL, sliderWidth, gap]);

  const sliderProps = {
    setTrackIsActive,
    initSliderWidth,
    setActiveItem: SetActiveItem,
    activeItem: ActiveItem,
    constraint,
    itemWidth,
    positions,
    arrows,
    navigateOnClick,
    gap,
    onPassMaxLimit,
    onPassMinLimit,
  };

  const trackProps: TrackProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem: SetActiveItem,
    activeItem: ActiveItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
    trackBgColor,
    style: trackStyle,
    onPassMaxLimit,
    onPassMinLimit,
    swipe,
    gap,
  };

  const itemProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem: SetActiveItem,
    activeItem: ActiveItem,
    constraint,
    itemWidth,
    positions,
    gap,
  };

  return (
    <Slider
      constraint={constraint}
      itemWidth={itemWidth}
      setTrackIsActive={setTrackIsActive}
      initSliderWidth={initSliderWidth}
      setActiveItem={setActiveItem}
      activeItem={activeItem}
      positions={positions}
      gap={gap}
    >
      <Track {...trackProps}>
        {children &&
          children.map((child, index) => (
            <Item {...itemProps} index={index} key={index}>
              {child}
            </Item>
          ))}
      </Track>
    </Slider>
  );
};

interface SliderProps {
  setTrackIsActive: Dispatch<SetStateAction<boolean>>;
  initSliderWidth: (width: number) => any;
  setActiveItem: (item: number) => any;
  activeItem: number;
  constraint: number;
  itemWidth: number;
  positions: number[];
  children: React.ReactNode;
  arrows?: boolean;
  gap: number;
  navigateOnClick?: boolean;
  onPassMaxLimit?: () => any;
  onPassMinLimit?: () => any;
}

const Slider: React.FC<SliderProps> = ({
  setTrackIsActive,
  initSliderWidth,
  setActiveItem,
  activeItem,
  constraint,
  positions,
  children,
  gap,
  arrows,
  itemWidth,
  navigateOnClick,
  onPassMaxLimit,
  onPassMinLimit,
  ...props
}) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  function adjustWidth() {
    initSliderWidth(Math.round(sliderRef.current?.offsetWidth || 0));
  }
  adjustWidth();
  useEffect(() => {
    if ("undefined" !== typeof window) {
      adjustWidth();
      window.addEventListener("resize", adjustWidth);
      window.addEventListener("load", adjustWidth);
      window.addEventListener("scroll", adjustWidth);
      return () => {
        window.removeEventListener("load", adjustWidth);
        window.removeEventListener("resize", adjustWidth);
        window.removeEventListener("scroll", adjustWidth);
      };
    }
  }, [sliderRef, initSliderWidth, activeItem]);

  const handleFocus = () => setTrackIsActive(true);

  const handleDecrementClick = () => {
    if (activeItem === 0) {
      onPassMinLimit && onPassMinLimit();
    }
    setTrackIsActive(true);
    !(activeItem === positions.length - positions.length) &&
      setActiveItem(activeItem - 1);
  };

  const handleIncrementClick = () => {
    if (activeItem === positions.length - 1) {
      onPassMaxLimit && onPassMaxLimit();
    }
    !(activeItem === positions.length - constraint) &&
      setActiveItem(activeItem + 1);
  };
  React.useEffect(() => {
    setTrackIsActive(true);
  }, [activeItem]);

  function handleSliderClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!navigateOnClick) return;
    const itemRect = e.currentTarget.getBoundingClientRect();
    const itemXPosition = itemRect.left;
    const itemWidth = itemRect.width;
    const clickPosition = e.clientX - itemXPosition;
    const halfW = itemWidth / 2;

    if (clickPosition > halfW) {
      handleIncrementClick();
    } else if (clickPosition < halfW) {
      handleDecrementClick();
    }
  }

  return (
    <div ref={sliderRef} className="relative flex items-center flex-row">
      <div
        onClick={handleSliderClick}
        className="w-full h-full relative overflow-hidden transition-all duration-500"
      >
        <div
          className="absolute inset-y-0 left-0 w-[calc(${gap} / 2)] bg-gradient-to-r from-base-d400 to-transparent z-10"
        />
        <div
          className="absolute inset-y-0 right-0 w-[calc(${gap} / 2)] bg-gradient-to-l from-base-d400 to-transparent z-10"
        />
        {children}
      </div>


      {arrows && (
        <>
          <button
            onClick={handleDecrementClick}
            onFocus={handleFocus}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/60 rounded-full min-w-0 p-2 hover:bg-white/80 transition"
          >
            <DoubleChevronLeftIcon className="w-[9px] h-[9px]" />
          </button>

          <button
            onClick={handleIncrementClick}
            onFocus={handleFocus}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/60 rounded-full min-w-0 p-2 hover:bg-white/80 transition"
          >
            <DoubleChevronRightIcon className="w-[9px] h-[9px]" />
          </button>

        </>
      )}
    </div>
  );
};

interface TrackProps {
  setTrackIsActive: Dispatch<SetStateAction<boolean>>;
  trackIsActive: boolean;
  setActiveItem: (item: number) => any;
  activeItem: number;
  constraint: number;
  multiplier: number;
  itemWidth: number;
  positions: number[];
  trackBgColor?: string;
  children?: ReactNode[]; 
  swipe?: boolean;
  movementDirection?: "vertical" | "horizontal";
  className?: string; // Instead of style, using Tailwind-compatible className
  gap: number;
  onPassMaxLimit?: () => any;
  onPassMinLimit?: () => any;
}

const Track: React.FC<TrackProps> = ({
  setTrackIsActive,
  trackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  multiplier,
  itemWidth,
  positions,
  children,
  trackBgColor,
  swipe,
  movementDirection,
  gap,
  onPassMaxLimit,
  onPassMinLimit,
}) => {
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const node = useRef<HTMLDivElement>(null);

  const handleDragStart = () => setDragStartPosition(positions[activeItem]);

  const handleDragEnd = (event: React.MouseEvent, info: PanInfo) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x * multiplier;
    const direction = velocity < 0 || distance < 0 ? 1 : -1;

    const extrapolatedPosition =
      dragStartPosition +
      (direction === 1
        ? Math.min(velocity, distance)
        : Math.max(velocity, distance));

    if (
      extrapolatedPosition < positions[positions.length - 1] &&
      activeItem === positions.length - 1
    ) {
      onPassMaxLimit && onPassMaxLimit();
    }
    if (extrapolatedPosition > 0 && activeItem === 0) {
      onPassMinLimit && onPassMinLimit();
    }
    const closestPosition = positions.reduce((prev, curr) => {
      if (
        Math.abs(curr - extrapolatedPosition) <
        Math.abs(prev - extrapolatedPosition)
      ) {
        // console.log("test 1", extrapolatedPosition, curr, prev);
        return curr;
      } else {
        // if (prev < 1 && extrapolatedPosition > 0) {
        //   console.log("call prev");
        // }
        return prev;
      }
    }, 0);

    if (!(closestPosition < positions[positions.length - constraint])) {
      setActiveItem(positions.indexOf(closestPosition));
      controls.start({
        x: closestPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      });
    } else {
      setActiveItem(positions.length - constraint);
      controls.start({
        x: positions[positions.length - constraint],
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      });
    }
  };

  const handleResize = useCallback(
    () =>
      controls.start({
        x: positions[activeItem],
        transition: {
          ...transitionProps,
        },
      }),
    [activeItem, controls, positions]
  );

  const handleClick = useCallback(
    (event: any) => {
      if (node.current) {
        node.current.contains(event.target)
          ? setTrackIsActive(true)
          : setTrackIsActive(false);
      }
    },
    [setTrackIsActive]
  );

  const handleKeyDown = useCallback(
    (event: any) => {
      if (trackIsActive) {
        if (activeItem < positions.length - constraint) {
          if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            event.preventDefault();
            setActiveItem(activeItem + 1);
          }
        }
        if (activeItem > positions.length - positions.length) {
          if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            event.preventDefault();
            setActiveItem(activeItem - 1);
          }
        }
      }
    },
    [trackIsActive, setActiveItem, activeItem, constraint, positions.length]
  );

  useEffect(() => {
    handleResize();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick, handleResize, handleKeyDown, positions]);

  return (
    <>
      {/* {itemWidth && ( */}
      <div ref={node} className="flex flex-col bg-[trackBgColor] space-y-5 items-stretch">
        <MotionFlex
          dragConstraints={node}
          onDragStart={handleDragStart}
          // @ts-ignore
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          align="center"
          w={`calc((100% + ${gap}px) * ${positions.length})`}
          drag={"x"}
          h="100%"
          _active={swipe ? { cursor: "grabbing" } : undefined}
          minWidth="min-content"
          flexWrap="nowrap"
          cursor={swipe ? "grab" : "auto"}
        >
          {/*@ts-ignore*/}
          {children}
        </MotionFlex>
      </div>
      {/* )} */}
    </>
  );
};

interface ItemProps
  extends Omit<TrackProps, "multiplier" | "children" | "trackBgColor"> {
  index: number;
  gap: number;
  children: React.ReactElement;
}

const Item: React.FC<ItemProps> = ({
  setTrackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  index,
  gap,
}) => {
  const [userDidTab, setUserDidTab] = React.useState(false);

  const handleFocus = () => setTrackIsActive(true);

  const handleBlur = () => {
    userDidTab && index + 1 === positions.length && setTrackIsActive(false);
    setUserDidTab(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) =>
    event.key === "Tab" &&
    !(activeItem === positions.length - constraint) &&
    setActiveItem(index);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) =>
    event.key === "Tab" && setUserDidTab(true);

  return (
    <ShadcnFlex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      data-testid="CarouselItem"
      className={`w-[calc((100% / ${positions.length}) + ${gap}px)] h-full justify-center items-center py-1 ${gap ? "mr-[${gap}px]" : ""
        }`}
    >
      {children}
    </ShadcnFlex>
  )
};
