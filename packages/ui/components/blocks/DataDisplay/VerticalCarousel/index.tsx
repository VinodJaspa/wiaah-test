import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { motion, PanInfo, useAnimation, useMotionValue } from "framer-motion";
import React from "react";
const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3,
};
export interface VerticalCarouselProps extends FlexProps {
  gap?: number;
  explicitActiveItem?: number;
  onCurrentActiveChange?: (index: number) => any;
  itemProps?: FlexProps;
  arrows?: boolean;
  onPassMaxLimit?: () => any;
  onPassMinLimit?: () => any;
}

const MotionFlex = motion<FlexProps>(Flex as any);

export const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  children,
  gap = 0,
  onCurrentActiveChange,
  itemProps,
  onPassMaxLimit,
  onPassMinLimit,
  arrows,
  explicitActiveItem,
  ...props
}) => {
  const [dragStartPosition, setDragStartPosition] = React.useState(0);
  const [activeItem, setActiveItem] = React.useState<number>(0);
  // const [itemHeight, setItemHeight] = React.useState<number>(0);
  const [itemWidth, setItemWidth] = React.useState(0);

  React.useEffect(() => {
    onCurrentActiveChange && onCurrentActiveChange(activeItem);
  }, [activeItem]);

  React.useEffect(() => {
    if (explicitActiveItem) {
      setActiveItem(explicitActiveItem);
    }
  }, [explicitActiveItem]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemHeight = containerRef.current
    ? containerRef.current.getBoundingClientRect().height
    : 0;
  const TrackContainerRef = React.useRef<HTMLDivElement>(null);

  const controls = useAnimation();
  const y = useMotionValue(0);
  console.log("height", itemHeight);
  const positions = React.useMemo(
    () =>
      React.Children.toArray(children).map(
        (_, index) => -Math.abs(itemHeight * index)
      ),
    [children, itemHeight, gap]
  );

  // React.useEffect(() => {
  //   if (containerRef.current) {
  //     setItemHeight(containerProps.height);
  //     setItemWidth(containerProps.width);
  //   }
  // }, [containerRef]);

  const handleDragStart = () => setDragStartPosition(positions[activeItem]);

  const handleDragEnd = (event: React.MouseEvent, info: PanInfo) => {
    const distance = info.offset.y;
    const velocity = info.velocity.y * 0.2;
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
      return Math.abs(curr - extrapolatedPosition) <
        Math.abs(prev - extrapolatedPosition)
        ? curr
        : prev;
    }, 0);
    console.log(closestPosition, positions);

    if (!(closestPosition < positions[positions.length])) {
      setActiveItem(positions.indexOf(closestPosition));
      controls.start({
        y: closestPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      });
    } else {
      setActiveItem(positions.length);
      controls.start({
        y: positions[positions.length],
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      });
    }
  };

  return (
    <Flex
      data-testid="CarouselSlider"
      ref={containerRef}
      w="100%"
      position={"relative"}
    >
      <Box w="100%" ref={TrackContainerRef}>
        <MotionFlex
          dragConstraints={TrackContainerRef}
          direction={"column"}
          onDragStart={handleDragStart}
          // @ts-ignore
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ y }}
          drag={"y"}
          _active={{ cursor: "grabbing" }}
          minWidth="min-content"
          h={`calc(100% * ${positions.length})`}
          flexWrap="nowrap"
          w="100%"
          gap={gap}
        >
          {/* {children && */}
          {React.Children.toArray(children).map((child, i) => (
            <Flex
              mt={`${gap}px`}
              align="center"
              justify={"center"}
              key={i}
              data-testid="Item"
              w={"auto"}
              h={`calc((100% / ${positions.length}) + ${gap}px )`}
              overflow="hidden"
            >
              {/*@ts-ignore*/}
              {child as unknown as React.ReactNode}
            </Flex>
          ))}
        </MotionFlex>
      </Box>
    </Flex>
  );
};
