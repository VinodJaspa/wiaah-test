import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridListOrganiser } from "./GridListOrganiser";
import { storybookListWrappersTitle } from "utils";

export default {
  title: storybookListWrappersTitle + "GridListOrganiser",
  component: GridListOrganiser,
} as ComponentMeta<typeof GridListOrganiser>;

const template: ComponentStory<typeof GridListOrganiser> = (args) => (
  <GridListOrganiser {...args} />
);

export const Default = template.bind({});
Default.args = {
  presets: [
    {
      length: 8,
      cols: 5,
      points: [...Array(4)]
        .map(() => ({ c: 1, r: 1 }))
        .concat([
          { c: 1, r: 2 },
          { c: 2, r: 1 },
        ])
        .concat([
          { c: 1, r: 1 },
          { c: 1, r: 1 },
        ]),
    },
    {
      length: 6,
      cols: 5,
      points: [
        {
          c: 2,
          r: 2,
        },
        {
          c: 1,
          r: 1,
        },
        {
          c: 1,
          r: 2,
        },
        {
          c: 1,
          r: 1,
        },
        {
          c: 1,
          r: 1,
        },
        {
          c: 1,
          r: 1,
        },
      ],
    },
  ],
  rowSize: "14rem",
  children: [...Array(50)].map((_, i) => (
    <div className="w-full h-full bg-yellow-500" key={i}>
      child-{i}
    </div>
  )),
};
