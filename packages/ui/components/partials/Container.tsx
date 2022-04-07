import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`${props.className || ""} container mx-auto`}>
      {children}
    </div>
  );
};
