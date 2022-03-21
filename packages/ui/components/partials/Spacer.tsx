import React, { FC } from "react";

export interface SpacerProps {
  spaceInRem?: number;
  spaceInPx?: number;
  spaceInEm?: number;
  variant?: "vertical" | "horizontal";
}

export const Spacer: FC<SpacerProps> = ({
  spaceInRem = 1,
  spaceInPx,
  spaceInEm,
  variant = "horizontal",
}) => {
  const [styles, setStyles] = React.useState<React.CSSProperties>({});
  React.useEffect(() => {
    switch (variant) {
      case "horizontal":
        if (spaceInRem)
          setStyles({ height: `${spaceInRem}rem`, width: "100%" });
        if (spaceInPx) setStyles({ height: `${spaceInPx}px`, width: "100%" });
        if (spaceInEm) setStyles({ height: `${spaceInEm}em`, width: "100%" });
        return;
      case "vertical":
        if (spaceInRem)
          setStyles({ width: `${spaceInRem}rem`, height: "100%" });
        if (spaceInPx) setStyles({ width: `${spaceInPx}px`, height: "100%" });
        if (spaceInEm) setStyles({ width: `${spaceInEm}em`, height: "100%" });
        return;
    }
  }, []);

  return <div style={styles}></div>;
};
