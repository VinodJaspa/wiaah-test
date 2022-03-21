import React from "react";

export interface DropdownPanelProps {
  name: string;
  open?: boolean;
  columns?: 1 | 2 | 3;
}

export const DropdownPanel: React.FC<DropdownPanelProps> = ({
  name,
  children,
  open = false,
  columns = 1,
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
    <div className="w-fit bg-white px-4 shadow-md">
      <div
        onClick={() => handleDropdownToggle()}
        className="flex w-60 cursor-pointer select-none items-center justify-between  py-2 font-semibold text-black"
      >
        <span>{name}</span>
        <span className="text-lg">{Opened ? "-" : "+"}</span>
      </div>
      <div
        style={ChildrensContainerStyle}
        className={`${
          Opened ? "h-fit" : "h-0"
        } grid transform gap-y-2 overflow-clip  transition-all duration-1000`}
      >
        {children}
      </div>
    </div>
  );
};
