import React from "react";
import { SidebarProvider } from "../helpers/SidebarContext";
import classNames from "classnames";

export const Root: React.FC = ({ children }) => {
  return (
    <>
      <SidebarProvider>
        <div
          className={classNames(
            "relative flex min-h-screen w-full flex-col overflow-hidden"
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </>
  );
};
