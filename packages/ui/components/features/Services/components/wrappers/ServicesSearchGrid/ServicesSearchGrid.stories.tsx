import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServicesSearchGrid } from "./ServicesSearchGrid";

export default {
  title: "UI / Features /Services /Data Display /ServicesSearchGrid",
  component: ServicesSearchGrid,
} as Meta<typeof ServicesSearchGrid>;

export const Default = {
  args: {
    component: (props: any) => <div>{props.test}</div>,
    data: [...Array(16)].map((_, i) => ({ text: `text-${i}` })),
    handlePassData(data: any) {
      return { test: data.text };
    },
  },
};
