import React from "react";

export type AccordionKeyType = string | number;

interface AccordionContextValueType {
  itemsOpen: AccordionKeyType[];
  isItemOpen: (key: AccordionKeyType) => boolean;
  openItem: (key: AccordionKeyType) => unknown;
  closeItem: (key: AccordionKeyType) => unknown;
  toggleItem: (key: AccordionKeyType) => unknown;
  closeAll: () => unknown;
  isLazy: boolean;
  defaultOpen: boolean;
}

export const AccordionContext = React.createContext<AccordionContextValueType>({
  itemsOpen: [],
  openItem: () => {},
  closeAll: () => {},
  closeItem: () => {},
  toggleItem: () => {},
  isItemOpen: () => false,
  isLazy: false,
  defaultOpen: false,
});

interface AccordionItemContextValueType {
  key: AccordionKeyType;
}

export const AccordionItemContext =
  React.createContext<AccordionItemContextValueType>({
    key: "",
  });
