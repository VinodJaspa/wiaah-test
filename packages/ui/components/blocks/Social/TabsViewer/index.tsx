import React from "react";
import { Tabs, TabList, TabItem, TabTitle, TabsHeader, TabsProps } from "ui";
import { TabType } from "types";
import { runIfFn } from "utils";

export interface TabsViewerProps extends Omit<TabsProps, "children"> {
  tabs: TabType[];
  reverseOrder?: boolean;
  showPanels?: boolean;
  showTabs?: boolean;
}

export const TabsViewer: React.FC<TabsViewerProps> = ({
  tabs,
  reverseOrder,
  showPanels = true,
  showTabs = true,
  ...props
}) => {
  return tabs.length > 0 ? (
    <Tabs {...props}>
      {showTabs && (
        <TabsHeader className="justify-center py-[1rem]">
          {tabs.map(({ name }, i) => (
            <TabTitle key={i} TabKey={i}>
              {({ currentTabIdx }) => {
                return (
                  <div
                    className={`${
                      currentTabIdx === i ? "border-primary" : "border-gray-600"
                    } border-b-2 capitalize text-gray-500`}
                  >
                    {runIfFn(name)}
                  </div>
                );
              }}
            </TabTitle>
          ))}
        </TabsHeader>
      )}

      {showPanels && (
        <TabList className="">
          {tabs.map(({ component }, i) => (
            <TabItem key={i}>{component}</TabItem>
          ))}
        </TabList>
      )}
    </Tabs>
  ) : null;
};
