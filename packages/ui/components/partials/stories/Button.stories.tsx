import React from "react";
import { storybookBlocksTitle, StorybookImplemntationLayout } from "utils";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@UI";

export default {
  title: "UI/partials/Button",
  component: Button,
} as Meta<typeof Button>;

export const Default = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Button } from "@UI"

...
return (
  <Button>Test</Button>
)
      
      `}
    >
      <Button>Test</Button>
    </StorybookImplemntationLayout>
  );
};

export const WithColorSchemes = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Button } from "@UI"

...
return (
  <div className="flex gap-4 flex-wrap">
    <Button colorScheme="primary">Test</Button>
    <Button colorScheme="info">Test</Button>
    <Button colorScheme="danger">Test</Button>
    <Button colorScheme="gray">Test</Button>
  </div>
)
      
      `}
    >
      <div className="flex gap-4 flex-wrap">
        <Button colorScheme="primary">primary</Button>
        <Button colorScheme="info">info</Button>
        <Button colorScheme="danger">danger</Button>
        <Button colorScheme="gray">gray</Button>
      </div>
    </StorybookImplemntationLayout>
  );
};
export const loadingState = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Button } from "@UI"

...
return (

    <Button loading={true} colorScheme="primary">Test</Button>

)
      
      `}
    >
      <div className="flex gap-4 flex-wrap">
        <Button loading colorScheme="primary">
          primary
        </Button>
      </div>
    </StorybookImplemntationLayout>
  );
};
