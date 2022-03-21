import React, {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
} from "react";

export interface StackProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  alignItems?: "center" | "start" | "end";
  reverse?: boolean;
  wrap?: boolean;
  setId?: string;
  justify?: "center" | "between" | "around" | "evenly" | "start" | "end";
  fullWidth?: boolean;
  horizontalSpacingInRem?:
    | 0.25
    | 0.5
    | 0.75
    | 1
    | 1.25
    | 1.5
    | 1.75
    | 2
    | 2.25
    | 2.5
    | 2.75
    | 3
    | number;

  verticalSpacingInRem?:
    | 0.25
    | 0.5
    | 0.75
    | 1
    | 1.25
    | 1.5
    | 1.75
    | 2
    | 2.25
    | 2.5
    | 2.75
    | 3
    | number;
  className?: string;
}

export const FlexStack: FC<StackProps> = ({
  children,
  reverse,
  direction = "horizontal",
  wrap,
  setId,
  verticalSpacingInRem,
  horizontalSpacingInRem,
  className,
  fullWidth,
  alignItems,
  justify = "center",
  ...props
}) => {
  const [styles, setStyles] = React.useState<CSSProperties>({});

  React.useEffect(() => {
    switch (direction) {
      case "horizontal":
        if (reverse) {
          setStyles((state) => ({ ...state, flexDirection: "row-reverse" }));
        } else {
          setStyles((state) => ({ ...state, flexDirection: "row" }));
        }
        break;
      case "vertical":
        if (reverse) {
          setStyles((state) => ({ ...state, flexDirection: "column-reverse" }));
        } else {
          setStyles((state) => ({ ...state, flexDirection: "column" }));
        }
        break;
      default:
        setStyles((state) => ({ ...state, flexDirection: "row" }));
        break;
    }

    if (alignItems) {
      setStyles((state) => ({ ...state, alignItems: alignItems }));
    }

    if (wrap) {
      setStyles((state) => ({ ...state, flexWrap: "wrap" }));
    } else {
      setStyles((state) => ({ ...state, flexWrap: "nowrap" }));
    }
    if (verticalSpacingInRem) {
      setStyles((state) => ({
        ...state,
        rowGap: `${verticalSpacingInRem}rem`,
      }));
    }
    if (horizontalSpacingInRem) {
      setStyles((state) => ({
        ...state,
        columnGap: `${horizontalSpacingInRem}rem`,
      }));
    }

    switch (justify) {
      case "between":
        setStyles((state) => ({ ...state, justifyContent: "space-between" }));
        break;
      case "around":
        setStyles((state) => ({ ...state, justifyContent: "space-around" }));
        break;
      case "evenly":
        setStyles((state) => ({ ...state, justifyContent: "space-evenly" }));
        break;
      case "center":
        setStyles((state) => ({ ...state, justifyContent: "center" }));
        break;
      case "end":
        setStyles((state) => ({ ...state, justifyContent: "end" }));
        break;
      default:
        setStyles((state) => ({ ...state, justifyContent: "end" }));
        break;
    }

    if (fullWidth) setStyles((state) => ({ ...state, width: "100%" }));
  }, []);

  return (
    <div style={styles} className={`flex h-fit w-fit`} {...props} id={setId}>
      {children}
    </div>
  );
};
