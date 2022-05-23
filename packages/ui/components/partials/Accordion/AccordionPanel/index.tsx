import React from "react";
import { HtmlDivProps } from "types";
import { AccordionContext, AccordionItemContext } from "ui";

export interface AccordionPanelProps extends HtmlDivProps {}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  className,
  ...props
}) => {
  const { isItemOpen } = React.useContext(AccordionContext);
  const { key } = React.useContext(AccordionItemContext);
  const open = isItemOpen(key);
  return (
    <div
      {...props}
      className={`${className || ""} ${
        open ? "h-fit" : "h-0"
      } overflow-clip origin-top transform w-full transition-all`}
    />
  );
};
