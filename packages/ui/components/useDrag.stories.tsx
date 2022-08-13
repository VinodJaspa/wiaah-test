import { ComponentMeta } from "@storybook/react";
import { useDrag } from "hooks";
// import { storybookPlaygourndTitle } from "utils";
import React from "react";

const DragTest = () => {
  const [end, setState] = React.useState<object>({});
  const [drag, setDrag] = React.useState<object>({});
  const dragRef = useDrag({
    onDragEnd(x, y, velocityX, velocityY, date) {
      setState({ x, y, velocityX, velocityY, date });
    },
    onDrag(x, y, xDiff, yDiff) {
      setDrag({ x, y, xDiff, yDiff });
    },
    onDragStart(x, y) {},
  });
  return (
    <div ref={dragRef} className={"w-96 h-96 bg-primary"}>
      <h1>{JSON.stringify(end)}</h1>
      <h2>{JSON.stringify(drag)}</h2>
    </div>
  );
};

export default {
  title: "dragTest",
  component: DragTest,
} as ComponentMeta<typeof DragTest>;

export const Default = () => <DragTest />;
