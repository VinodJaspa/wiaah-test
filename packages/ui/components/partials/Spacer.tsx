import React, { FC } from "react";

export interface SpacerProps {
  spaceInRem?: number;
  spaceInPx?: number;
  spaceInEm?: number;
}

export const Spacer: FC<SpacerProps> = ({
  spaceInRem,
  spaceInPx,
  spaceInEm,
}) => {
  const spacerRef: any = React.useRef(null);
  React.useEffect(() => {
    const {
      current: { style },
    } = spacerRef;

    if (spaceInRem) style.height = `${spaceInRem}rem`;
    if (spaceInPx) style.height = `${spaceInPx}px`;
    if (spaceInEm) style.height = `${spaceInEm}em`;
  }, []);
  return <div ref={spacerRef} className="h-4 w-full"></div>;
};
