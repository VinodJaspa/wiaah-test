import React from "react";
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
}

export const TabsViewer: React.FC<TabsViewerProps> = ({
  tabs,
  reverseOrder,
  showPanels = true,
  showTabs = true,
  children,
  ...props
}) => {
  return tabs.length > 0 ? (
    <Tabs {...props}>
      {showTabs && (
        <TabsHeader className="justify-center flex-wrap py-[0px]">
          {tabs.map(({ name }, i) => (
            <TabTitle key={i} TabKey={i}>
              {({ currentTabIdx }) => {
                return (
                  <div
                    className={`${
                      currentTabIdx === i
                        ? "border-primary text-primary fill-primary font-bold"
                        : "font-semibold text-lightBlack border-transparent"
                    } border-b-2 pb-2 leading-6 text-sm`}
                  >
                    {runIfFn(name, { active: currentTabIdx === i })}
                  </div>
                );
              }}
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
    </Tabs>
  ) : null;
};
