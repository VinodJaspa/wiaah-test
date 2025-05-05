import React from "react";

import { useDimensions } from "@UI/../hooks";
import { cn } from "@UI/components/shadcn-components/lib/utils";

export type GridWrapperDataType = {
  displayVariant: "portrait" | "landscape" | "large" | "normal";
  component: React.ReactElement;
};

export interface GridWrapperProps {
  cols: number;
  items: GridWrapperDataType[];
  portrait?: boolean;
  itemProps?: React.HTMLAttributes<HTMLDivElement>;
  gridProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const GridWrapper: React.FC<GridWrapperProps> = ({
  cols,
  items,
  itemProps,
  gridProps,
  portrait,
}) => {
  const gridItemRef = React.useRef<HTMLDivElement>(null);
  const gridItemDim = useDimensions(gridItemRef);

  return (
    <div
      className={cn(
        "grid gap-2 relative pr-4",
        `grid-cols-${cols}`,
        gridProps?.className
      )}
      style={{
        gridAutoRows: `${(gridItemDim?.height || 128) * (portrait ? 2 : 1)}px`,
      }}
    >
      <div
        className="absolute w-full"
        data-testid="griditemhelper"
        ref={gridItemRef}
      />
      {items.map(({ component, displayVariant }, i) => (
        <div
          key={i}
          className={cn(
            displayVariant === "landscape" || displayVariant === "large"
              ? "col-span-2"
              : "",
            displayVariant === "portrait" || displayVariant === "large"
              ? "row-span-2"
              : "",
            itemProps?.className
          )}
        >
          {component}
        </div>
      ))}
    </div>
  );
};
