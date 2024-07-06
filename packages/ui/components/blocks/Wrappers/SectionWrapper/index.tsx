import React from "react";
import { HtmlDivProps } from "types";

interface SectionWrapperProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className="flex flex-col gap-8">
      {children}
    </div>
  );
};
