import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ListWrapper } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
import { randomNum } from "../../../helpers/randomNumber";
export default {
  title: "UI/blocks/Social/ListWrapper",
  component: ListWrapper,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof ListWrapper>;

const Template: ComponentStory<typeof ListWrapper> = (args) => (
  <ListWrapper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  cols: 3,
  children: [...Array(6)].map(() => (
    <div
      style={{ paddingTop: `${randomNum(50)}px` }}
      className={`bg-purple-500 px-8`}
    ></div>
  )),
};
