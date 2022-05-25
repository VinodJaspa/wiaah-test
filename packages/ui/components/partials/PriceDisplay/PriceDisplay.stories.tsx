import { storybookPartailsTitle, StorybookImplemntationLayout } from "ui/utils";
import { ComponentMeta } from "@storybook/react";
import React from "react";
import { PriceDisplay } from "ui";

export default {
  title: storybookPartailsTitle + "PriceDisplay",
} as ComponentMeta<typeof PriceDisplay>;

export const Default = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { PriceDisplay } from "ui"

...
return (
    <PriceDisplay
      priceObject={{
        amount: 15,
        currency: "USD",
      }}
    />
)
        `}
    >
      <PriceDisplay
        priceObject={{
          amount: 15,
          currency: "USD",
        }}
      />
    </StorybookImplemntationLayout>
  );
};
