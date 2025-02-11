"use client";
import React from "react";
import { HtmlDivProps, TabType } from "types";
import {
  Divider,
  TabItem,
  TabList,
  TabTitle,
  Tabs,
  TabsHeader,
  TabsProps,
} from "ui";
import { cn, runIfFn } from "utils";

export interface TabsViewerProps extends Omit<TabsProps, "children"> {
  tabs: TabType[];
  reverseOrder?: boolean;
  showPanels?: boolean;
  showTabs?: boolean;
  children?: React.ReactNode;
  border?: "top" | "bottom";
  tabListProps?: HtmlDivProps;
  showIcons?: boolean;
  showHeaderTitle?: boolean;
  headerClassName?: string;
  tabTitleClassName?: string;
  tabItemClassName?: string;
}

export const TabsViewer: React.FC<TabsViewerProps> = ({
  tabs,
  reverseOrder,
  showPanels = true,
  showTabs = true,
  children,
  border = "top",
  tabListProps,
  showIcons = true,
  showHeaderTitle,
  headerClassName,
  tabTitleClassName,
  tabItemClassName,
  ...props
}) => {
  if (!tabs || tabs.length === 0) return <div></div>;

  const borderPositionClass = border === "top" ? "border-t-2" : "border-b-2";
  const dividerPositionClass = border === "top" ? "-top-1.5" : "-bottom-[5px]";

  return (
    <Tabs {...props}>
      {({ currentTabIdx, setCurrentTabIdx }) => (
        <>
          {showTabs && (
            <TabsHeader
              className={cn(
                "md:justify-center justify-between flex-wrap py-0 md:gap-8 px-2 relative",
                headerClassName,
              )}
            >
              <Divider className={cn("absolute", dividerPositionClass)} />
              {tabs.map(({ name, outlineIcon, solidIcon }, i) => {
                const isActive = currentTabIdx === i;

                return (
                  <TabTitle
                    key={i}
                    TabKey={i}
                    className={cn(tabTitleClassName)}
                  >
                    <div
                      onClick={() => setCurrentTabIdx(i)}
                      className={cn(
                        "flex items-center gap-2 font-semibold md:text-xs text-[10px] leading-none",
                        isActive ? "text-black" : "text-[#8E8E8E]",
                        isActive ? borderPositionClass : "border-none",
                        isActive ? "md:pb-[22px] pb-[6px]" : "md:pb-6 pb-2",
                      )}
                    >
                      {showIcons && outlineIcon && solidIcon && (
                        <div
                          className={cn(
                            "mb-[3px] md:w-3 md:h-3 h-10 w-10 md:px-0 px-2",
                            isActive ? "text-black" : "text-[#8E8E8E]",
                          )}
                        >
                          {isActive ? solidIcon : outlineIcon}
                        </div>
                      )}
                      <p
                        className={cn(
                          "text-sm",
                          showIcons && outlineIcon && solidIcon
                            ? "hidden md:flex"
                            : "flex",
                        )}
                      >
                        {runIfFn(name, { active: isActive })}
                      </p>
                    </div>
                  </TabTitle>
                );
              })}
            </TabsHeader>
          )}
          {children}
          {showPanels && (
            <TabList
              className={cn(
                "flex w-full justify-center",
                tabItemClassName,
                tabListProps?.className,
              )}
              {...tabListProps}
            >
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
