import React from "react";
import { AccordionContext, AccordionKeyType } from "state";

export interface AccordionProps {
  controled?: boolean;
  isLazy?: boolean;
  defaultOpenItems?: AccordionKeyType[];
}

export const Accordion: React.FC<AccordionProps> = ({
  controled,
  isLazy,
  defaultOpenItems,
  ...props
}) => {
  const [itemsOpen, setItemsOpen] = React.useState<AccordionKeyType[]>(
    defaultOpenItems || []
  );

  function toggleItem(key: AccordionKeyType) {
    const isOpen = isItemOpen(key);
    if (isOpen) {
      closeItem(key);
    } else {
      openItem(key);
    }
  }

  function openItem(key: AccordionKeyType) {
    setItemsOpen((state) => {
      if (controled) {
        return [key];
      }
      return [...state, key];
    });
  }

  function isItemOpen(key: AccordionKeyType): boolean {
    const item = itemsOpen.findIndex((item) => item === key);
    return item > -1;
  }

  function closeItem(key: AccordionKeyType) {
    setItemsOpen((state) => state.filter((item) => item !== key));
  }
  function closeAll() {
    setItemsOpen([]);
  }

  return (
    <AccordionContext.Provider
      value={{
        itemsOpen,
        isLazy: !!isLazy,
        closeAll,
        closeItem,
        isItemOpen,
        openItem,
        toggleItem,
      }}
      {...props}
    />
  );
};
