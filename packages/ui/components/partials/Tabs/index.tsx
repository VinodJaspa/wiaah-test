import React from "react";
import { HtmlDivProps } from "types";
import { MaybeFn, runIfFn } from "utils";

interface TabsContextValue {
  currentTabIdx: number;
  tabsComponents: React.ReactNode[];
  tabsTitles: React.ReactNode[];
  setCurrentTabIdx: (idx: number) => any;
  setTabsComponents: (comps: React.ReactNode[]) => any;
  setTabsTitlesComponents: (comps: React.ReactNode[]) => any;
  addTab: (component: React.ReactNode) => any;
}

const TabsContext = React.createContext<TabsContextValue>({
  currentTabIdx: 0,
  tabsComponents: [],
  tabsTitles: [],
  setCurrentTabIdx: () => {},
  setTabsComponents: () => {},
  setTabsTitlesComponents: () => {},
  addTab: () => {},
});

export interface TabsProps {
  children: MaybeFn<TabsContextValue>;
}

export const Tabs: React.FC<TabsProps> = ({ children, ...props }) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [tabsTitles, setTabsTitle] = React.useState<React.ReactNode[]>([]);
  const [tabsComponents, setTabsComponents] = React.useState<React.ReactNode[]>(
    []
  );

  function setTabs(components: React.ReactNode[]) {
    setTabsComponents(components);
  }
  function addTab(component: React.ReactNode) {
    setTabsComponents((state) => [...state, component]);
  }
  function setTitles(components: React.ReactNode[]) {
    setTabsTitle(components);
  }

  function setCurrentTabIdx(tabIdx: number) {
    setCurrentTab(tabIdx);
  }

  return (
    <TabsContext.Provider
      value={{
        currentTabIdx: currentTab,
        setCurrentTabIdx,
        tabsComponents,
        tabsTitles,
        setTabsComponents: setTabs,
        setTabsTitlesComponents: setTitles,
        addTab,
      }}
      {...props}
    >
      {runIfFn<MaybeFn<TabsContextValue>, TabsContextValue>(children, {
        currentTabIdx: currentTab,
        tabsComponents,
        tabsTitles,
        setTabsComponents: setTabs,
        setTabsTitlesComponents: setTitles,
        setCurrentTabIdx,
        addTab,
      })}
    </TabsContext.Provider>
  );
};

export interface TabsHeaderProps extends HtmlDivProps {}

export const TabsHeader: React.FC<TabsHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={`${className || ""} flex gap-2 justify-center w-full py-2`}>
      {Array.isArray(children) &&
        children.map((tab, i) => <>{runIfFn(tab, {})}</>)}
    </div>
  );
};

export interface TabListProps extends HtmlDivProps {}

export const TabList: React.FC<TabListProps> = ({
  children,
  className,
  ...props
}) => {
  const { currentTabIdx } = React.useContext(TabsContext);
  return (
    <div className={`${className || ""} flex justify-center w-full`}>
      {Array.isArray(children) ? children[currentTabIdx] : children}
    </div>
  );
};

export interface TabTitleProps extends HtmlDivProps {}
export const TabTitle: React.FC<TabTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${
        className || ""
      } px-2 py-1 cursor-pointer text-lg font-bold`}
    >
      {children}
    </div>
  );
};

export interface TabItemProps {}
export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  const {} = React.useContext(TabsContext);
  React.useEffect(() => {}, []);
  return <>{children}</>;
};
