import React, { useContext } from "react";
import { SidebarProvider, SidebarContext } from "../helpers/SidebarContext";
import classNames from "classnames";

export const Root: React.FC = ({ children }) => {
  const sidebar = useContext(SidebarContext);

  return (
    <>
      <SidebarProvider>
        <div
          className={classNames(
            "flex flex-col w-full min-h-screen relative overflow-hidden"
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </>
  );
};
