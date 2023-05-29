import { useResponsive } from "hooks";
import React from "react";
import { runIfFn } from "utils";
import { useElementScrolling } from "utils";

export interface StaticSideBarWrapperProps {
  sidebar: React.ReactNode;
}

export const StaticSideBarWrapper: React.FC<StaticSideBarWrapperProps> = ({
  sidebar,
  children,
}) => {
  const { isTablet } = useResponsive();
  return (
    <div className="flex gap-[3.75rem]">
      <div
        style={{
          width: `calc(100% - min(${isTablet ? "0rem" : "30rem"} , 100%))`,
        }}
        className="flex flex-col gap-4"
      >
        {children}
      </div>
      <div className="w-[0px] overflow-hidden md:overflow-visible md:w-[min(30rem,100%)]">
        <FixedScrollingWrapper>{runIfFn(sidebar)}</FixedScrollingWrapper>
      </div>
    </div>
  );
};

export const FixedScrollingWrapper: React.FC = ({ children }) => {
  const WrapperRef = React.useRef<HTMLDivElement>(null);
  const { passed, y } = useElementScrolling(WrapperRef);

  return (
    <div ref={WrapperRef} className={`w-full relative h-full`}>
      <div
        style={{
          top: `${Math.abs(0) + 16 || 0}px`,
        }}
        className={`${
          passed ? `absolute left-0` : ""
        } w-full h-fit transition-all`}
      >
        {children}
      </div>
    </div>
  );
};
