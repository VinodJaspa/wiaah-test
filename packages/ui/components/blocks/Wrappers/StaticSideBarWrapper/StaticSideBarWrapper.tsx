import React from "react";
import { runIfFn } from "utils";

export interface StaticSideBarWrapperProps {
  sidebar: React.ReactNode;
}

export const StaticSideBarWrapper: React.FC<StaticSideBarWrapperProps> = ({
  sidebar,
  children,
}) => {
  return (
    <div className="flex gap-4 ">
      <div
        style={{
          width: `calc(100% - min(30rem , 100%))`,
        }}
        className="flex flex-col w-full gap-4"
      >
        {children}
      </div>
      <div className="w-[min(30rem,100%)]">
        <FixedScrollingWrapper>{runIfFn(sidebar)}</FixedScrollingWrapper>
      </div>
    </div>
  );
};
import { useElementScrolling } from "utils";

export const FixedScrollingWrapper: React.FC = ({ children }) => {
  const WrapperRef = React.useRef<HTMLDivElement>(null);
  const { passed, y } = useElementScrolling(WrapperRef);

  return (
    <div ref={WrapperRef} className={`w-full relative h-full`}>
      <div
        style={{
          top: `${Math.abs(0 ?? 0) + 16 || 0}px`,
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
