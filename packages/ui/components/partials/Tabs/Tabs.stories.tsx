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
} from "ui";

export default {
  title: storybookPartailsTitle + "Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

export const Default: React.FC<TabsProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Tabs, TabsHeader, TabList, TabItem, TabTitle } from "ui";

...
return (
<Tabs>
    {({ setCurrentTabIdx }) => {
    return (
            <>
          <TabsHeader>
            <TabTitle onClick={() => setCurrentTabIdx(0)}>title 1</TabTitle>
            <TabTitle onClick={() => setCurrentTabIdx(1)}>title 2</TabTitle>
            <TabTitle onClick={() => setCurrentTabIdx(2)}>title 3</TabTitle>
            <TabTitle onClick={() => setCurrentTabIdx(3)}>title 4</TabTitle>
          </TabsHeader>
          <TabList>
            <TabItem>tab 1</TabItem>
            <TabItem>tab 2</TabItem>
            <TabItem>tab 3</TabItem>
            <TabItem>tab 4</TabItem>
          </TabList>
        </>
        );
    }}
</Tabs>
)
    `}
    >
      <Tabs>
        {({ setCurrentTabIdx }) => {
          return (
            <>
              <TabsHeader>
                <TabTitle onClick={() => setCurrentTabIdx(0)}>title 1</TabTitle>
                <TabTitle onClick={() => setCurrentTabIdx(1)}>title 2</TabTitle>
                <TabTitle onClick={() => setCurrentTabIdx(2)}>title 3</TabTitle>
                <TabTitle onClick={() => setCurrentTabIdx(3)}>title 4</TabTitle>
              </TabsHeader>
              <TabList>
                <TabItem>tab 1</TabItem>
                <TabItem>tab 2</TabItem>
                <TabItem>tab 3</TabItem>
                <TabItem>tab 4</TabItem>
              </TabList>
            </>
          );
        }}
      </Tabs>
    </StorybookImplemntationLayout>
  );
};

export const planCardsExample: React.FC<TabsProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Tabs, TabsHeader, TabList, TabItem, TabTitle } from "ui";

...
return (
<Tabs>
    {({ setCurrentTabIdx }) => {
    return (
            <>
          <TabsHeader>
            <TabTitle onClick={() => setCurrentTabIdx(0)}>title 1</TabTitle>
            <TabTitle onClick={() => setCurrentTabIdx(1)}>title 2</TabTitle>
            <TabTitle onClick={() => setCurrentTabIdx(2)}>title 3</TabTitle>
            <TabTitle onClick={() => setCurrentTabIdx(3)}>title 4</TabTitle>
          </TabsHeader>
          <TabList>
            <TabItem>tab 1</TabItem>
            <TabItem>tab 2</TabItem>
            <TabItem>tab 3</TabItem>
            <TabItem>tab 4</TabItem>
          </TabList>
        </>
        );
    }}
</Tabs>
)
    `}
    >
      <Tabs>
        {({ setCurrentTabIdx }) => {
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
                {plans.map(() => (
                  <SubscriptionPlanCard
                    price={{
                      amount: 15,
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
                ))}
              </TabList>
            </>
          );
        }}
      </Tabs>
    </StorybookImplemntationLayout>
  );
};

const plans = [...Array(3)].map((_, i) => ({
  planTitle: `plan ${i}`,
}));
