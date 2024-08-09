"use client";
import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabItem,
  TabTitle,
  TabsHeader,
  TabsProps,
  Divider,
} from "@UI";
import { TabType } from "types";
import { runIfFn } from "utils";

export interface TabsViewerProps extends Omit<TabsProps, "children"> {
  tabs: TabType[];
  reverseOrder?: boolean;
  showPanels?: boolean;
  showTabs?: boolean;
  children?: React.ReactNode;
}

export const TabsViewer: React.FC<TabsViewerProps> = ({
  tabs,
  reverseOrder,
  showPanels = true,
  showTabs = true,
  children,
  ...props
}) => {
  if (!tabs || tabs.length === 0) {
    return <div>Loading...</div>; // Display loading state or message
  }
  return (
    <Tabs {...props}>
      {({ currentTabIdx, setCurrentTabIdx }) => (
        <>
          {showTabs && (
            <TabsHeader className="md:justify-center justify-between flex-wrap py-[0px]  border-t-2 md:gap-8 gap-1">
              {tabs.map(({ name, outlineIcon, solidIcon }, i) => (
                <TabTitle key={i} TabKey={i}>
                  <div
                    onClick={() => setCurrentTabIdx(i)}
                    className={`flex items-center gap-2 space-x-2 font-semibold md:text-xs text-[10px] leading-none ${currentTabIdx === i
                        ? "border-b-2 md:border-t-2 md:border-b-0 border-t-0 md:py-[22px] py-[6px] border-black text-black fill-black "
                        : "border-none md:py-6 py-2 text-[#8E8E8E]"
                      }`}
                  >
                    <>
                      {outlineIcon && solidIcon && (
                        <div
                          className={`mb-[3px] md:w-3 md:h-3 h-10 w-10 md:px-0 px-2 ${currentTabIdx === i
                              ? "text-black"
                              : "text-[#8E8E8E]"
                            }`}
                        >
                          {currentTabIdx === i ? solidIcon : outlineIcon}
                        </div>
                      )}
                      <p className="hidden md:flex">
                        {runIfFn(name, { active: currentTabIdx === i })}
                      </p>
                    </>
                  </div>
                </TabTitle>
              ))}
            </TabsHeader>
          )}
          {children}
          {showPanels && (
            <TabList className="flex w-full justify-center">
              {tabs.map(({ component }, i) => (
                <TabItem key={i}>{runIfFn(component)}</TabItem>
              ))}
            </TabList>
          )}
        </>
      )}
    </Tabs>
  );
};
