import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  noContainer?: boolean;
}

export const Container: FC<ContainerProps> = ({
  noContainer = false,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${props.className || ""} ${
        noContainer ? "" : "container mx-auto"
      }`}
    >
      {children}
    </div>
  );
};
