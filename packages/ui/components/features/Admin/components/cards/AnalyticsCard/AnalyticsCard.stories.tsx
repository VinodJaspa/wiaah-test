import { ComponentMeta } from "@storybook/react";
import { AnalyticsCard } from "./AnalyticsCard";
import { storybookCardsTitle } from "utils";

export default {
  title: storybookCardsTitle + "AnalyticsCard",
  component: AnalyticsCard,
} as ComponentMeta<typeof AnalyticsCard>;

export const Default = () => (
  <AnalyticsCard
    amount={150}
    icon={<p>icon</p>}
    increase={true}
    percentage={15}
    title="Sales"
  />
);
