import { NotificationsPH, SubscriptionPlanCard } from "@UI";
import { storybookCardsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / cards /SubscriptionPlanCard",
  component: SubscriptionPlanCard,
} as Meta<typeof SubscriptionPlanCard>;

export const Default = () => (
  <SubscriptionPlanCard
    price={5}
    trialDays={30}
    benifits={["All kits included", "unlimited downloads", "ios support"]}
    onUpgradeRequest={() => {}}
  />
);
