import {
  storybookPartailsTitle,
  StorybookImplemntationLayout,
} from "utils";
import React from "react";
import { ComponentMeta } from "@storybook/react";
import { TranslationText } from "@UI";

export default {
  title: storybookPartailsTitle + "translationText",
  component: TranslationText,
} as ComponentMeta<typeof TranslationText>;

export const Default = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { TranslationText } from "@UI"

...
return (
    <TranslationText
        translationObject={{
          translationKey: "follow",
          fallbackText: "Follow",
        }}
    />
)
        `}
    >
      <TranslationText
        translationObject={{
          translationKey: "follow",
          fallbackText: "Follow",
        }}
      />
    </StorybookImplemntationLayout>
  );
};
