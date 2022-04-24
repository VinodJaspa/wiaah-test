import { BoxProps, Box } from "@chakra-ui/react";

export type FloatingPosition = boolean | "center" | string;

export interface FloatingItemProps
  extends Omit<BoxProps, "top" | "left" | "bottom" | "right"> {
  label?: React.ReactElement;
  top?: FloatingPosition;
  bottom?: FloatingPosition;
  left?: FloatingPosition;
  right?: FloatingPosition;
}

export interface FloatingContainerProps extends BoxProps {
  items?: FloatingItemProps[];
}
export const FloatingContainer: React.FC<FloatingContainerProps> = ({
  children,
  items,
  ...props
}) => {
  const setPosition = (position: FloatingPosition | undefined) =>
    position === "center"
      ? "50%"
      : typeof position === "string"
      ? position
      : position === true
      ? "0px"
      : undefined;

  return (
    <Box {...props} position={"relative"}>
      {items &&
        items.map(({ top, left, bottom, right, label }, i) => (
          <Box
            zIndex={5}
            position={"absolute"}
            top={setPosition(top)}
            left={setPosition(left)}
            right={setPosition(right)}
            bottom={setPosition(bottom)}
            transform="auto"
            translateX={left ? "-50%" : right ? "50%" : "0%"}
            translateY={top ? "-50%" : bottom ? "50%" : "0%"}
          >
            {label}
          </Box>
        ))}
      {children}
    </Box>
  );
};
