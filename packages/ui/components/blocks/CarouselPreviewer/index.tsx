import React, { CSSProperties, FC, ReactElement } from "react";

export interface CarouselPreviewerProps {
  components: ComponentDetails[];
  getCurrentComponent?: (component: number) => void;
  direction?: "vertical" | "horizontal";
  setCurrentComponentNum?: number;
  borderColor?: string;
}
export interface ComponentDetails {
  Component: React.ReactNode;
}

export const CarouselPreviewer: FC<CarouselPreviewerProps> = ({
  components,
  setCurrentComponentNum,
  getCurrentComponent,
  direction = "horizontal",
  borderColor = "#000",
}) => {
  const [itemStyles, setItemStyles] = React.useState<CSSProperties>({});
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  const [containerStyles, setContainerStyles] = React.useState<CSSProperties>(
    {},
  );
  const [subContainerStyles, setSubContainerStyles] =
    React.useState<CSSProperties>({});
  React.useEffect(() => {
    // set styles
    setItemStyles((state) => ({ ...state, borderColor: borderColor }));
  }, []);

  React.useEffect(() => {
    if (setCurrentComponentNum || setCurrentComponentNum === 0) {
      setCurrentComponent(setCurrentComponentNum);
    }
  }, [setCurrentComponentNum]);

  React.useEffect(() => {
    if (getCurrentComponent) {
      getCurrentComponent(currentComponent);
    }
  }, [currentComponent]);

  const handleItemClick = (itemNum: number) => {
    setCurrentComponent(itemNum);
  };

  switch (direction) {
    case "horizontal":
      return (
        <div
          style={containerStyles}
          className={`no-scroll noScrollBar m-2 mx-2 flex h-fit w-full overflow-x-scroll px-2`}
        >
          <div style={subContainerStyles} className="flex h-full w-fit gap-4">
            {components.map(({ Component }, i) => (
              <div
                onClick={() => handleItemClick(i)}
                style={itemStyles}
                key={i}
                className={`h-16 w-28  overflow-clip ${currentComponent === i ? `border-4` : ""
                  } rounded`}
              >
                {Component}
              </div>
            ))}
          </div>
        </div>
      );
    case "vertical":
      return (
        <div
          style={containerStyles}
          className={`no-scroll noScrollbar flex h-full w-24 overflow-y-hidden`}
        >
          <div
            style={subContainerStyles}
            className="flex h-fit w-full flex-col gap-4"
          >
            {components.map(({ Component }, i) => (
              <div
                onClick={() => handleItemClick(i)}
                style={itemStyles}
                key={i}
                className={`h-fit w-full overflow-clip ${currentComponent === i ? `border-4` : ""
                  } rounded`}
              >
                {Component}
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};
