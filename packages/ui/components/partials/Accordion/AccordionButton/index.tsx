import React from "react";
import { HtmlDivProps } from "types";
import { AccordionContext, AccordionItemContext } from "state";
import { ArrowDownIcon, ArrowUpIcon } from "ui";

export interface AccordionButtonProps extends HtmlDivProps {}

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  className,
  children,
  ...props
}) => {
  const { toggleItem, isItemOpen } = React.useContext(AccordionContext);
  const { key } = React.useContext(AccordionItemContext);

  function handleClick() {
    toggleItem(key || "");
  }

  return (
    <div
      {...props}
      className={`${className || ""} relative`}
      onClick={handleClick}
    >
      {children}
      <div className="absolute pointer-events-none right-2 top-1/2 -translate-y-1/2">
        {isItemOpen(key) ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
    </div>
  );
};
