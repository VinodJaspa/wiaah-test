import React, { CSSProperties, FC, ReactElement } from "react";

export interface CarouselPreviewerProps {
  components: ComponentDetails[];
  getCurrentComponent?: (component: number) => void;
  direction?: "vertical" | "horizontal";
  setCurrentComponentNum?: number;
  length?: "100%" | string;
  itemSize?: "sm" | "md" | "lg" | "xl";
}
export interface ComponentDetails {
  Component: ReactElement;
}

export const CarouselPreviewer: FC<CarouselPreviewerProps> = ({
  components,
  setCurrentComponentNum,
  getCurrentComponent,
  direction = "horizontal",
  length = "75%",
  itemSize = "md",
}) => {
  const [itemStyles, setItemStyles] = React.useState<CSSProperties>({});
  const [currentComponent, setCurrentComponent] = React.useState<number>(0);
  const [containerStyles, setContainerStyles] = React.useState<CSSProperties>(
    {}
  );
  React.useEffect(() => {
    // set styles
    const getSize = () => {
      let width: string;
      let height: string;
      switch (itemSize) {
        case "sm":
          height = "3rem";
          width = "4.5rem";
          return width;
        case "md":
          width = "6rem";
          height = "4rem";
          return width;
        case "lg":
          width = "7.5rem";
          height = "5rem";

          return width;
        case "xl":
          width = "9rem";
          height = "6rem";
          return width;
      }
    };
    switch (direction) {
      case "vertical":
        setContainerStyles((state) => ({
          ...state,
          width: "fit-content",
          height: length,
        }));
        setContainerStyles((state) => ({ ...state, flexDirection: "column" }));
        break;
      case "horizontal":
        setContainerStyles((state) => ({
          ...state,
          width: length,
          height: "fit-content",
        }));
        setContainerStyles((state) => ({ ...state, flexDirection: "row" }));
        break;
      default:
        setContainerStyles((state) => ({
          ...state,
          width: length,
          flexDirection: "row",
          height: "fit-content",
        }));
        break;
    }
    switch (itemSize) {
      case "sm":
        setItemStyles((state) => ({
          ...state,
          width: "4.5rem",
          height: "3rem",
        }));
        break;
      case "md":
        setItemStyles((state) => ({ ...state, width: "6rem", height: "4rem" }));
        break;
      case "lg":
        setItemStyles((state) => ({
          ...state,
          width: "7.5rem",
          height: "5rem",
        }));
        break;
      case "xl":
        setItemStyles((state) => ({ ...state, width: "9rem", height: "6rem" }));
        break;
    }
  }, []);

  React.useEffect(() => {
    if (!setCurrentComponentNum) return;
    setCurrentComponent(setCurrentComponentNum);
  }, [setCurrentComponentNum]);

  React.useEffect(() => {
    if (getCurrentComponent) {
      getCurrentComponent(currentComponent);
    }
  }, [currentComponent]);

  const handleItemClick = (itemNum: number) => {
    setCurrentComponent(itemNum);
  };

  return (
    <div style={containerStyles} className={`flex flex-wrap gap-4 p-1`}>
      {components.map(({ Component }, i) => (
        <div
          onClick={() => handleItemClick(i)}
          style={itemStyles}
          key={i}
          className={`h-16 w-24 ${
            currentComponent === i ? "border-2 border-white " : ""
          } overflow-hidden rounded`}
        >
          {Component}
        </div>
      ))}
    </div>
  );
};
