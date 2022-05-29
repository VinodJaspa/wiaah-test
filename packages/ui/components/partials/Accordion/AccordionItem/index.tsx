import React from "react";
import { HtmlDivProps } from "types";
import { AccordionKeyType, AccordionItemContext } from "ui/state";

export interface AccordionItemProps extends HtmlDivProps {
  itemkey: AccordionKeyType;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  itemkey,
  className,
  ...props
}) => {
  return (
    <AccordionItemContext.Provider value={{ key: itemkey }}>
      <div
        {...props}
        className={`${
          className || ""
        } flex flex-col gap-1 p-2 rounded bg-white`}
      />
    </AccordionItemContext.Provider>
  );
};
