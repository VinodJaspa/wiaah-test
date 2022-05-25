import { storybookPartailsTitle, StorybookImplemntationLayout } from "ui/utils";
import React from "react";
import { ComponentMeta } from "@storybook/react";
import { TranslationText } from "ui";

export default {
  title: storybookPartailsTitle + "translationText",
  component: TranslationText,
} as ComponentMeta<typeof TranslationText>;

export const Default = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { TranslationText } from "ui"

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
