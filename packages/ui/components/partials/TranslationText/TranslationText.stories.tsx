import { storybookPartailsTitle, StorybookImplemntationLayout } from "utils";
import React from "react";
import { Meta } from "@storybook/react";
import { TranslationText } from "@UI";

export default {
  title: "UI / partials / translationText",
  component: TranslationText,
} as Meta<typeof TranslationText>;

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
