import {
  Box,
  Grid,
  GridItem,
  GridItemProps,
  GridProps,
} from "@chakra-ui/react";
import { useDimensions } from "@UI/../hooks";
import React from "react";
export type GridWrapperDataType = {
  displayVariant: "portrait" | "landscape" | "large" | "normal";
  component: React.ReactElement;
};

export interface GridWrapperProps {
  cols: number;
  items: GridWrapperDataType[];
  portrait?: boolean;
  itemProps?: GridItemProps;
  gridProps?: GridProps;
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
    <Grid
      pr="1rem"
      gridAutoRows={`${(gridItemDim?.height || 128) * (portrait ? 2 : 1)}px`}
      templateColumns={`repeat(${cols}, calc(100% / ${cols}))`}
      gap={"0.5rem"}
      position={"relative"}
      {...gridProps}
    >
      <GridItem
        position={"absolute"}
        data-testid="griditemhelper"
        ref={gridItemRef}
        w={`calc(100% / ${cols})`}
      />
      {items &&
        items.map(({ component, displayVariant }, i) => (
          <GridItem
            {...itemProps}
            key={i}
            colSpan={
              displayVariant === "landscape" || displayVariant === "large"
                ? 2
                : undefined
            }
            rowSpan={
              displayVariant === "portrait" || displayVariant === "large"
                ? 2
                : undefined
            }
          >
            {component}
          </GridItem>
        ))}
    </Grid>
  );
};
