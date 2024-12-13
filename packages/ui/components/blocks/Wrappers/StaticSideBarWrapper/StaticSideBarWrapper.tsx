import { useResponsive } from "hooks";
import React from "react";
import { runIfFn } from "utils";
import { useElementScrolling } from "utils";

export interface StaticSideBarWrapperProps {
  sidebar: React.ReactNode;
  children?: React.ReactNode;
}

export const StaticSideBarWrapper: React.FC<StaticSideBarWrapperProps> = ({
  sidebar,
  children,
}) => {
  const { isTablet } = useResponsive();
  return (
    <div className="flex gap-[3.75rem]">
      {/* Main content area */}
      <div
        style={{
          width: `calc(100% - min(${isTablet ? "0rem" : "30rem"}, 100%))`,
        }}
        className="flex flex-col gap-4"
      >
        {children}
      </div>

      {/* Sidebar */}
      <div className="w-[0px] overflow-hidden md:overflow-visible md:w-[min(30rem,100%)]">
        <FixedScrollingWrapper>{runIfFn(sidebar)}</FixedScrollingWrapper>
      </div>
    </div>
  );
};

export const FixedScrollingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="sticky top-0 max-h-screen overflow-y-auto mt-4"
      style={{
        zIndex: 10, // Ensure it stays above other content
      }}
    >
      {children}
    </div>
  );
};
