import { HtmlDivProps } from "types";
import React from "react";

export interface SectionContainerProps extends HtmlDivProps {
  header?: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  header,
  ...props
}) => {
  return (
    <div {...props} className="flex flex-col gap-8">
      {header}
      {children}
    </div>
  );
};
