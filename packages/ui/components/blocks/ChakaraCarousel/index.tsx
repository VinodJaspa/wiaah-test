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
} from "react";

import {
  useMediaQuery,
  useTheme,
  VStack,
  Button,
  Flex,
  Box,
  FlexProps,
} from "@chakra-ui/react";

import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { motion, PanInfo, useAnimation, useMotionValue } from "framer-motion";
import { useBoundingRect } from "ui/Hooks";

const MotionFlex = motion<FlexProps>(Flex);

const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3,
};

export interface ChakaraCarouselProps extends FlexProps {
  children: React.ReactElement[];
  gap?: number;
  activeItem?: number;
  setActiveItem?: (item: number) => any;
  onCurrentActiveChange?: (
    currentActive: number,
    currentActiveData?: any
  ) => any;
  trackBgColor?: string;
  arrows?: boolean;
  swipe?: boolean;
  navigateOnClick?: boolean;
  movementDirection?: "vertical" | "horizontal";
}

export const ChakraCarousel: React.FC<ChakaraCarouselProps> = ({
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

  const initSliderWidth = useCallback((width) => setSliderWidth(width), []);

  const positions = useMemo(
    () =>
      children &&
      children.map((_, index) => -Math.abs((itemWidth + gap) * index)),
    [children, itemWidth, gap]
  );

  React.useEffect(() => {
    onCurrentActiveChange && onCurrentActiveChange(activeItem);
  }, [activeItem]);

  const { breakpoints } = useTheme();

  const [isBetweenBaseAndMd] = useMediaQuery(
    `(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.md})`
  );

  const [isBetweenMdAndXl] = useMediaQuery(
    `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.xl})`
  );

  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);

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
  };

  const trackProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem: SetActiveItem,
    activeItem: ActiveItem,
    sliderWidth,
    constraint,
    multiplier,
    itemWidth,
    positions,
    gap,
    trackBgColor,
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
    <Slider {...props} {...sliderProps}>
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

interface SliderProps extends FlexProps {
  setTrackIsActive: Dispatch<SetStateAction<boolean>>;
  initSliderWidth: (width: number) => any;
  setActiveItem: (item: number) => any;
  activeItem: number;
  constraint: number;
  itemWidth: number;
  positions: number[];
  children: ReactElement;
  arrows?: boolean;
  gap: number;
  navigateOnClick?: boolean;
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
    setTrackIsActive(true);
    !(activeItem === positions.length - positions.length) &&
      setActiveItem(activeItem - 1);
  };

  const handleIncrementClick = () => {
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
    <Flex
      position={"relative"}
      {...props}
      // overflowX={"auto"}
      align={"center"}
      direction={"row"}
      ref={sliderRef}
    >
      <Box
        onClick={handleSliderClick}
        w="100%"
        transition="all"
        transitionDuration={"500ms"}
        // w={{ base: "100%", md: `calc(100% + ${gap}px)` }}
        // ml={{ base: 0, md: `-${gap / 2}px` }}
        // px={`${gap / 2}px`}
        position={"relative"}
        overflow="hidden"
        _before={{
          bgGradient: "linear(to-r, base.d400, transparent)",
          position: "absolute",
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: "100%",
          left: 0,
          top: 0,
        }}
        _after={{
          bgGradient: "linear(to-l, base.d400, transparent)",
          position: "absolute",
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: "100%",
          right: 0,
          top: 0,
        }}
      >
        {children}
      </Box>
      {arrows && (
        <>
          <Button
            onClick={handleDecrementClick}
            onFocus={handleFocus}
            position={"absolute"}
            top="50%"
            left="1rem"
            translateY={"-50%"}
            bgColor="whiteAlpha.600"
            rounded={"full"}
            transform="auto"
            colorScheme={"primary"}
            variant="link"
            minW={0}
          >
            <ChevronLeftIcon boxSize={9} />
          </Button>
          <Button
            onClick={handleIncrementClick}
            onFocus={handleFocus}
            colorScheme={"primary"}
            variant="link"
            position={"absolute"}
            top="50%"
            right="1rem"
            rounded={"full"}
            transform={"auto"}
            translateY={"-50%"}
            zIndex={2}
            bgColor="whiteAlpha.600"
            minW={0}
          >
            <ChevronRightIcon boxSize={9} />
          </Button>
        </>
      )}
    </Flex>
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
  children: ReactElement[];
  swipe?: true;
  movementDirection?: "vertical" | "horizontal";
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

    const closestPosition = positions.reduce((prev, curr) => {
      return Math.abs(curr - extrapolatedPosition) <
        Math.abs(prev - extrapolatedPosition)
        ? curr
        : prev;
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
    (event) => {
      if (node.current) {
        node.current.contains(event.target)
          ? setTrackIsActive(true)
          : setTrackIsActive(false);
      }
    },
    [setTrackIsActive]
  );

  const handleKeyDown = useCallback(
    (event) => {
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
      <VStack bg={trackBgColor} ref={node} spacing={5} alignItems="stretch">
        <MotionFlex
          dragConstraints={node}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          drag={"x"}
          _active={swipe && { cursor: "grabbing" }}
          minWidth="min-content"
          flexWrap="nowrap"
          cursor={swipe && "grab"}
        >
          {children}
        </MotionFlex>
      </VStack>
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
    <Flex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      // onMouseOver={(e) => console.log(e)}
      w={`${itemWidth}px`}
      _notLast={{
        mr: `${gap}px`,
      }}
      py="4px"
    >
      {children}
    </Flex>
  );
};
