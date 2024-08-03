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
            <TabsHeader className="justify-center flex-wrap py-[0px] border-t-2 gap-8">
              {tabs.map(({ name, outlineIcon, solidIcon }, i) => (
                <TabTitle key={i} TabKey={i}>
                  <div
                    onClick={() => setCurrentTabIdx(i)}
                    className={`flex items-center gap-2 space-x-2  font-semibold text-xs leading-none ${currentTabIdx === i
                        ? "border-t-2 py-2.5 border-black text-black fill-black "
                        : "border-none py-3 text-[#8E8E8E]"
                      }`}
                  >
                    <>
                      {outlineIcon && solidIcon && (
                        <div
                          className={`mb-[3px] ${currentTabIdx === i
                              ? "text-black"
                              : "text-[#8E8E8E]"
                            }`}
                        >
                          {currentTabIdx === i ? solidIcon : outlineIcon}
                        </div>
                      )}
                      {runIfFn(name, { active: currentTabIdx === i })}
                    </>
                  </div>
                </TabTitle>
              ))}
            </TabsHeader>
          )}
          {children}
          {showPanels && (
            <TabList className="">
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
