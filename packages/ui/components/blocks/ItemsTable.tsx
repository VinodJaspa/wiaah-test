import React from "react";
import { FlexStack, Spacer } from "../partials";

export interface ItemTable {
  title: string;
  items: TableItem[];
  onItemSelect?: (item: TableItem) => void;
}

interface TableItem {
  name: string;
}

export const ItemsTable: React.FC<ItemTable> = ({
  items = [],
  title,
  onItemSelect,
}) => {
  const [activeItem, setActiveItem] = React.useState<number>();

  function handleItemSelection(index: number) {
    setActiveItem(index);
    if (onItemSelect) {
      onItemSelect(items[index]);
    }
  }
  return (
    <div className="h-fit min-w-[12rem] border-2 border-gray-200 border-opacity-60">
      <FlexStack fullWidth={true} direction="vertical" verticalSpacingInRem={2}>
        <div className="bg-[#3AD398] p-4 font-semibold text-white">
          {/* header */}
          {title}
        </div>
        <FlexStack direction="vertical" verticalSpacingInRem={2}>
          {items.map((item, i) => (
            <span
              onClick={() => handleItemSelection(i)}
              className={`${
                activeItem === i ? "text-[#3AD398]" : "text-black"
              } cursor-pointer px-8 font-semibold`}
              key={i}
            >
              {item.name}
            </span>
          ))}
        </FlexStack>
        <span></span>
      </FlexStack>
    </div>
  );
};
