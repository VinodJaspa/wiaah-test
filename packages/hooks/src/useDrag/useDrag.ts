import React from "react";
import { throttle } from "utils";

export const useDrag = ({
  onDrag,
  onDragEnd,
  onDragStart,
}: {
  onDrag?: (x: number, y: number, xDiff: number, yDiff: number) => any;
  onDragStart?: (x: number, y: number) => any;
  onDragEnd?: (
    x: number,
    y: number,
    velocityX: number,
    velocityY: number,
    dateDiff: number
  ) => any;
}) => {
  const [draging, setDraging] = React.useState<boolean>();
  const [dragStartPoints, setDragStartPoints] = React.useState<{
    x: number;
    y: number;
  }>();
  const [startDate, setStartDate] = React.useState<number>();

  const throttledOnDrag = throttle(onDrag, 200);

  return React.useCallback(
    (node?: HTMLDivElement | null) => {
      if (node) {
        node.onmousedown = (e) => {
          const { x, y } = e;
          setDraging(true);
          onDragStart && onDragStart(x, y);
          setDragStartPoints({ x, y });
          setStartDate(Date.now());
        };
        document.onmousemove = (e) => {
          if (draging) {
            const { x, y } = e;
            const xDiff = dragStartPoints ? dragStartPoints?.x - x : 0;
            const yDiff = dragStartPoints ? dragStartPoints?.y - y : 0;
            onDrag && throttledOnDrag(x, y, xDiff, yDiff);
          }
        };
        if (document) {
          document.onmouseup = (e) => {
            if (!draging) return;
            const { x, y } = e;
            const date = Date.now();
            const dateDiff = startDate ? date - startDate : 0;
            const xDiff = dragStartPoints ? x - dragStartPoints?.x || 0 : 0;
            const yDiff = dragStartPoints ? y - dragStartPoints?.y || 0 : 0;

            const dateInsec = dateDiff / 1000;

            const xVelocity = xDiff / dateInsec;
            const yVelocity = yDiff / dateInsec;

            onDragEnd &&
              onDragEnd(
                xDiff,
                yDiff,
                Math.floor(xVelocity),
                Math.floor(yVelocity),
                dateDiff
              );

            setDraging(false);
            setDragStartPoints(undefined);
            setStartDate(undefined);
          };
        }
      }
    },
    [draging, dragStartPoints, startDate]
  );
};
