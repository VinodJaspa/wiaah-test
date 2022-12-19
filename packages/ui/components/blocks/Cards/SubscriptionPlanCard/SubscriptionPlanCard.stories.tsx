import { NotificationsPH, SubscriptionPlanCard } from "@UI";
import { storybookCardsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookCardsTitle + "SubscriptionPlanCard",
  component: SubscriptionPlanCard,
} as ComponentMeta<typeof SubscriptionPlanCard>;

export const Default = () => (
  <SubscriptionPlanCard
    price={{
      amount: 15,
      currency: "CHF",
    }}
    trialDays={30}
    benifits={["All kits included", "unlimited downloads", "ios support"]}
    onUpgradeRequest={() => {}}
  />
);
