import React from "react";
import { HtmlDivProps } from "types";
import { CallbackAfter } from "utils";
import { AccordionContext, AccordionItemContext } from "state";

export interface AccordionPanelProps extends HtmlDivProps {
  forceState?: boolean;
}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  className,
  children,
  forceState,
  ...props
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  const { isItemOpen, isLazy, defaultOpen } =
    React.useContext(AccordionContext);
  const { key } = React.useContext(AccordionItemContext);
  const open = typeof forceState === "boolean" ? forceState : isItemOpen(key);

  React.useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      CallbackAfter(200, () => setShow(false));
    }
  }, [open, isLazy]);

  return (
    <div
      {...props}
      className={`${className || ""} ${
        open ? "h-fit" : "h-0"
      } overflow-clip origin-top transform w-full transition-all`}
    >
      {isLazy ? (show ? children : null) : children}
    </div>
  );
};
