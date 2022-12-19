import {
  storybookPartailsTitle,
  StorybookImplemntationLayout,
} from "@UI/utils";
import { ComponentMeta } from "@storybook/react";
import React from "react";
import { PriceDisplay } from "@UI";

export default {
  title: storybookPartailsTitle + "PriceDisplay",
} as ComponentMeta<typeof PriceDisplay>;

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
