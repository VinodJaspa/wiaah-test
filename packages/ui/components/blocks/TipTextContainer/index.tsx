import React from "react";
import { Divider, DividerWidthChild } from "@UI";
export interface TipTextContainerProps {
  children?: React.ReactNode;
}

export const TipTextContainer: React.FC<TipTextContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <DividerWidthChild>
        <span className="w-[40rem] bg-black bg-opacity-70 py-[1px]"></span>
      </DividerWidthChild>
      <div className="flex w-full items-center justify-center">{children}</div>
      <Divider />
    </div>
  );
};
