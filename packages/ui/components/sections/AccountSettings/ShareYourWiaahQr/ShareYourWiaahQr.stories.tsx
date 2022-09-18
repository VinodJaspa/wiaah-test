import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ShareYourWiaahQr } from "./ShareYourWiaahQr";
import { storybookSectionsTitle } from "utils";

export default {
  title: storybookSectionsTitle + "ShareYourWiaahQr",
  component: ShareYourWiaahQr,
} as ComponentMeta<typeof ShareYourWiaahQr>;

const template: ComponentStory<typeof ShareYourWiaahQr> = (args) => (
  <ShareYourWiaahQr {...args} />
);

export const Default = template.bind({});
Default.args = {};
