import { TabList, Tabs, TabsHeader, TabTitle } from "@partials";

type Tab = {
  name: string;
  component: React.ReactNode;
};

type ServicesProviderTabsProps = {
  tabs: Tab[];
  t: (key: string) => string;
};

export const ServicesProviderDetailsTabs: React.FC<
  ServicesProviderTabsProps
> = ({ tabs, t }) => {
  return (
    <Tabs>
      {({ currentTabIdx, setCurrentTabIdx }) => (
        <>
          <TabsHeader className="flex">
            {tabs.map((tab, index) => (
              <TabTitle key={index} TabKey={index}>
                <p
                  onClick={() => setCurrentTabIdx(index)}
                  className={`${
                    currentTabIdx === index ? "text-primary" : "text-lightBlack"
                  } font-bold text-sm`}
                >
                  {t(tab.name)}
                </p>
              </TabTitle>
            ))}
          </TabsHeader>
          <TabList />
          {tabs[currentTabIdx].component}
        </>
      )}
    </Tabs>
  );
};
