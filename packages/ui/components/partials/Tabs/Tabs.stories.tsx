import { ComponentMeta } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout, storybookPartailsTitle } from "utils";
import {
  Tabs,
  TabsHeader,
  TabList,
  TabItem,
  TabsProps,
  TabTitle,
  SubscriptionPlanCard,
} from "@UI";

export default {
  title: storybookPartailsTitle + "Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

export const Default: React.FC<TabsProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Tabs, TabsHeader, TabList, TabItem, TabTitle } from "@UI";

...
return (
<Tabs>
    <TabsHeader>
        <TabTitle>title 1</TabTitle>
        <TabTitle>title 2</TabTitle>
        <TabTitle>title 3</TabTitle>
        <TabTitle>title 4</TabTitle>
    </TabsHeader>
    <TabList>
        <TabItem>tab 1</TabItem>
        <TabItem>tab 2</TabItem>
        <TabItem>tab 3</TabItem>
        <TabItem>tab 4</TabItem>
    </TabList>
</Tabs>
)
    `}
    >
      <Tabs>
        <TabsHeader>
          <TabTitle>title 1</TabTitle>
          <TabTitle>title 2</TabTitle>
          <TabTitle>title 3</TabTitle>
          <TabTitle>title 4</TabTitle>
        </TabsHeader>
        <TabList>
          <TabItem>tab 1</TabItem>
          <TabItem>tab 2</TabItem>
          <TabItem>tab 3</TabItem>
          <TabItem>tab 4</TabItem>
        </TabList>
      </Tabs>
    </StorybookImplemntationLayout>
  );
};

export const CustomItemsOrdering: React.FC<TabsProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Tabs, TabsHeader, TabList, TabItem, TabTitle } from "@UI";


Tip: <TabsHeader /> and <TabsList /> has to be insde the Tabs component
...
return (
<Tabs>
  <TabsHeader />

  <TabTitle>title 1</TabTitle>
  <TabItem>tab 1</TabItem>

  <TabTitle>title 2</TabTitle>
  <TabItem>tab 2</TabItem>

  <TabTitle>title 3</TabTitle>
  <TabItem>tab 3</TabItem>

  <TabTitle>title 4</TabTitle>
  <TabItem>tab 4</TabItem>

  <TabList />
</Tabs>
)
    `}
    >
      <Tabs>
        <TabsHeader />

        <TabTitle>title 1</TabTitle>
        <TabItem>tab 1</TabItem>

        <TabTitle>title 2</TabTitle>
        <TabItem>tab 2</TabItem>

        <TabTitle>title 3</TabTitle>
        <TabItem>tab 3</TabItem>

        <TabTitle>title 4</TabTitle>
        <TabItem>tab 4</TabItem>

        <TabList />
      </Tabs>
    </StorybookImplemntationLayout>
  );
};

export const accessInnerState: React.FC<TabsProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Tabs, TabsHeader, TabList, TabItem, TabTitle } from "@UI";

...
return (
<Tabs>
    {({ setCurrentTabIdx,addTab,addTitle,currentTabIdx,setTabsComponents,setTabsTitlesComponents,tabsComponents,tabsTitles }) => {
      return (
        <>
          <TabsHeader>
          {plans.map((title, i) => (
            <TabTitle onClick={() => setCurrentTabIdx(i)} key={i}>
              {title.planTitle}
            </TabTitle>
          ))}
        </TabsHeader>
        <TabList className="w-full mb-8">
          {plans.map((_, i) => (
            <TabItem>
              <SubscriptionPlanCard
                price={{
                  amount: i,
                  currency: "CHF",
                }}
                trialDays={30}
                benifits={[
                  "All kits included",
                  "unlimited downloads",
                  "ios support",
                ]}
                onUpgradeRequest={() => {}}
              />
            </TabItem>
          ))}
        </TabList>
      </>
    );
  }}
</Tabs>
)
    `}
    >
      <Tabs>
        <>
          <TabsHeader />
          {plans.map((title, i) => (
            <>
              <TabTitle>
                {({ currentTabIdx }) => {
                  console.log("current", currentTabIdx);
                  return (
                    <span
                      className={`${currentTabIdx === i ? "text-black" : "text-gray-600"
                        }`}
                    >
                      {title.planTitle} {currentTabIdx}
                    </span>
                  );
                }}
              </TabTitle>

              <TabItem>
                <SubscriptionPlanCard
                  price={i}
                  trialDays={30}
                  benifits={[
                    "All kits included",
                    "unlimited downloads",
                    "ios support",
                  ]}
                  onUpgradeRequest={() => { }}
                />
              </TabItem>
            </>
          ))}
          <TabList />
        </>
      </Tabs>
    </StorybookImplemntationLayout>
  );
};

const plans = [...Array(3)].map((_, i) => ({
  planTitle: `plan ${i}`,
}));
