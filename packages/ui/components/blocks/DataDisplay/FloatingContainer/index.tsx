import { HtmlDivProps } from "types";

export type FloatingPosition = boolean | "center" | string;

export interface FloatingItemProps
  extends Omit<HtmlDivProps, "top" | "left" | "bottom" | "right"> {
  label?: React.ReactElement;
  top?: FloatingPosition;
  bottom?: FloatingPosition;
  left?: FloatingPosition;
  right?: FloatingPosition;
  centerX?: boolean;
  centerY?: boolean;
  floatingItemProps?: HtmlDivProps;
}

export interface FloatingContainerProps extends HtmlDivProps {
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
    <div className="relative" {...props}>
      {items &&
        items.map(
          (
            {
              top,
              left,
              bottom,
              right,
              label,
              centerX,
              centerY,
              floatingItemProps,
            },
            i
          ) => (
            <div
              className="absolute transform z-[5]"
              {...floatingItemProps}
              style={{
                top: setPosition(top),
                left: setPosition(left),
                right: setPosition(right),
                bottom: setPosition(bottom),
              }}
            >
              {label}
            </div>
          )
        )}
      {children}
    </div>
  );
};
