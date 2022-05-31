import React from "react";
import { HtmlDivProps } from "types";
import { AccordionContext, AccordionItemContext } from "ui/state";

export interface AccordionButtonProps extends HtmlDivProps {}

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  ...props
}) => {
  const { toggleItem } = React.useContext(AccordionContext);
  const { key } = React.useContext(AccordionItemContext);

  function handleClick() {
    toggleItem(key || "");
  }

  return <div {...props} onClick={handleClick} />;
};
