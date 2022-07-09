import React from "react";
import { HtmlDivProps } from "types";

export interface DropdownPanelProps extends HtmlDivProps {
  name: string;
  open?: boolean;
  subPanel?: boolean;
  columns?: 1 | 2 | 3;
}

export const DropdownPanel: React.FC<DropdownPanelProps> = ({
  name,
  children,
  open = false,
  columns = 1,
  subPanel,
  className,
  ...props
}) => {
  const [Opened, setOpened] = React.useState<boolean>(open);
  const [ChildrensContainerStyle, setChildrensContainerStyle] =
    React.useState<React.CSSProperties>({});
  React.useEffect(() => {
    setChildrensContainerStyle((state) => ({
      ...state,
      gridTemplateColumns: `repeat(${columns}, minmax(0,${100 / columns}%))`,
    }));
  }, []);

  React.useEffect(() => {
    if (!open) return;
    setOpened(open);
  }, [open]);

  function handleOpenDropdown() {
    setOpened(true);
  }

  function handleDropdownToggle() {
    setOpened((opened) => !opened);
  }
  return (
    <div
      className={` bg-white ${
        subPanel ? "w-full pl-4" : "w-full px-4 pb-2 shadow-md"
      } ${className ? className : ""} `}
      {...props}
    >
      <div
        onClick={() => handleDropdownToggle()}
        data-test="DropdownPanelHead"
        className={`flex w-full cursor-pointer select-none items-center justify-between py-2 font-semibold text-black`}
      >
        <span data-test="DropdownName">{name}</span>
        <span data-test="DropdownSymbol" className="text-lg">
          {Opened ? "-" : "+"}
        </span>
      </div>
      <div
        style={ChildrensContainerStyle}
        data-test="DropdownChildsContainer"
        className={`${
          Opened ? "h-fit" : "h-0"
        }  grid transform gap-y-2 overflow-clip  transition-all duration-1000`}
      >
        {children}
      </div>
    </div>
  );
};
