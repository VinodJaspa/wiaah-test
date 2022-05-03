import {
  Box,
  Grid,
  GridItem,
  GridItemProps,
  useDimensions,
} from "@chakra-ui/react";
import React from "react";
export type GridWrapperDataType = {
  displayVariant: "portrait" | "landscape" | "large" | "normal";
  component: React.ReactElement;
};

export interface GridWrapperProps {
  cols: number;
  items: GridWrapperDataType[];
  itemProps?: GridItemProps;
}

export const GridWrapper: React.FC<GridWrapperProps> = ({
  cols,
  items,
  itemProps,
}) => {
  const gridItemRef = React.useRef<HTMLDivElement>(null);

  const gridItemDim = useDimensions(gridItemRef, true);

  const [test, setTest] = React.useState<boolean>(false);
  return (
    <Grid
      onClick={() => setTest((state) => !state)}
      pr="1rem"
      gridAutoRows={`${gridItemDim?.borderBox.width || 64}px`}
      templateColumns={`repeat(${cols}, calc(100% / ${cols}))`}
      gap={"0.5rem"}
      position={"relative"}
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
