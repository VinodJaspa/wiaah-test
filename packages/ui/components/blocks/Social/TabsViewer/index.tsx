import React from "react";
import { Tabs, TabList, TabItem, TabTitle, TabsHeader, TabsProps } from "ui";
import { TabType } from "types/market/misc/tabs";

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
        <TabsHeader className="justify-center">
          {tabs.map(({ name }, i) => (
            <TabTitle key={i} TabKey={i}>
              {() => {
                return <span className="capitalize text-gray-500">{name}</span>;
              }}
            </TabTitle>
          ))}
        </TabsHeader>
      )}

      {showPanels && (
        <TabList className="justify-center">
          {tabs.map(({ component }, i) => (
            <TabItem key={i}>{component}</TabItem>
          ))}
        </TabList>
      )}
    </Tabs>
  ) : null;
};
