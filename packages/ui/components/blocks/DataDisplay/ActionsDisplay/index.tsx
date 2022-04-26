import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { motion, PanInfo, useAnimation, useMotionValue } from "framer-motion";
import React from "react";
const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3,
};
export interface ActionsDisplayProps extends FlexProps {
  children: React.ReactElement[];
  gap?: number;
  onActiveItemChange?: (index: number) => any;
  itemProps?: FlexProps;
}

const MotionFlex = motion<FlexProps>(Flex);

export const ActionsDisplay: React.FC<ActionsDisplayProps> = ({
  children,
  gap = 0,
  onActiveItemChange,
  itemProps,
  ...props
}) => {
  const [dragStartPosition, setDragStartPosition] = React.useState(0);
  const [activeItem, setActiveItem] = React.useState<number>(0);
  const [itemHeight, setItemHeight] = React.useState<number>(0);

  React.useEffect(() => {
    onActiveItemChange && onActiveItemChange(activeItem);
  }, [activeItem]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const TrackContainerRef = React.useRef<HTMLDivElement>(null);

  const controls = useAnimation();
  const y = useMotionValue(0);

  const positions = React.useMemo(
    () => children && children.map((_, index) => -Math.abs(itemHeight * index)),
    [children, itemHeight, gap]
  );

  React.useEffect(() => {
    if (containerRef.current) {
      const containerProps = containerRef.current.getBoundingClientRect();
      setItemHeight(containerProps.height);
    }
  }, [containerRef]);

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

    const closestPosition = positions.reduce((prev, curr) => {
      return Math.abs(curr - extrapolatedPosition) <
        Math.abs(prev - extrapolatedPosition)
        ? curr
        : prev;
    }, 0);

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
    <Flex {...props} ref={containerRef} w="100%" position={"relative"}>
      <Box w="100%" ref={TrackContainerRef}>
        <MotionFlex
          dragConstraints={TrackContainerRef}
          direction={"column"}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ y }}
          drag={"y"}
          _active={{ cursor: "grabbing" }}
          minWidth="min-content"
          flexWrap="nowrap"
          w="100%"
          gap={gap}
        >
          {children &&
            children.map((child, i) => (
              <Flex
                align="center"
                justify={"center"}
                key={i}
                data-testid="Item"
                w="100%"
                h={itemHeight}
                overflow="hidden"
                {...itemProps}
              >
                {child}
              </Flex>
            ))}
        </MotionFlex>
      </Box>
    </Flex>
  );
};
