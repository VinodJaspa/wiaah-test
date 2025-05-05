import { storybookPartailsTitle, StorybookImplemntationLayout } from "utils";
import { Meta } from "@storybook/react";
import React from "react";
import { PriceDisplay } from "@UI";

export default {
  title: "UI / partials / PriceDisplay",
} as Meta<typeof PriceDisplay>;

export const Default = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { PriceDisplay } from "@UI"

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
