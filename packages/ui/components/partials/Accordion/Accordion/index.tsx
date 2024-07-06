import React from "react";
import { AccordionContext, AccordionKeyType } from "state";

export interface AccordionProps {
  controled?: boolean;
  isLazy?: boolean;
  defaultOpen?: boolean;
  defaultOpenItems?: AccordionKeyType[];
  onChange?: (v: AccordionKeyType[]) => any;
  value?: AccordionKeyType[];
  children?: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  controled,
  isLazy,
  defaultOpenItems,
  defaultOpen = false,
  onChange: _onChange,
  value: _value,
  ...props
}) => {
  const [itemsOpen, setItemsOpen] = React.useState<AccordionKeyType[]>(
    defaultOpenItems || []
  );

  const value = _value ?? itemsOpen;
  const onChange = _onChange ?? setItemsOpen;

  function toggleItem(key: AccordionKeyType) {
    const isOpen = isItemOpen(key);
    if (isOpen) {
      closeItem(key);
    } else {
      openItem(key);
    }
  }

  function openItem(key: AccordionKeyType) {
    onChange(controled ? [key] : [...value, key]);
  }

  function isItemOpen(key: AccordionKeyType): boolean {
    const item = value.findIndex((item) => item === key);
    return item > -1;
  }

  function closeItem(key: AccordionKeyType) {
    onChange(value.filter((item) => item !== key));
  }
  function closeAll() {
    onChange([]);
  }

  return (
    <AccordionContext.Provider
      value={{
        itemsOpen: value,
        isLazy: !!isLazy,
        closeAll,
        closeItem,
        isItemOpen,
        openItem,
        toggleItem,
        defaultOpen,
      }}
      {...props}
    >
      {children}
    </AccordionContext.Provider>
  );
};
