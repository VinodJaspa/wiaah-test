import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Badge } from "./Badge";
import { storybookPartailsTitle } from "utils";
import React from "react";

export default {
  title: storybookPartailsTitle + "Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;

const template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = template.bind({});
Default.args = {};

export const WithVariants = template.bind({});
WithVariants.decorators = [
  (Story) => (
    <div className="flex flex-wrap gap-4">
      <Story args={{ variant: "success", children: "success" }}>success</Story>
      <Story args={{ variant: "warning", children: "warning" }}>warning</Story>
      <Story args={{ variant: "fail", children: "fail" }}>fail</Story>
      <Story args={{ variant: "info", children: "info" }}>info</Story>
    </div>
  ),
];

export const WithValueCases = template.bind({});
WithValueCases.decorators = [
  (Story) => {
    const [state, setState] = React.useState<string>("success value");
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="font-bold text-2xl">{state}</p>
        <Story
          args={{
            value: state,
            cases: {
              fail: "fail value",
              info: "info value",
              success: "success value",
              warning: "warning value",
            },
            children: "Badge",
          }}
        />
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setState("success value")}>
            success value
          </button>
          <button onClick={() => setState("fail value")}>fail value</button>
          <button onClick={() => setState("info value")}>info value</button>
          <button onClick={() => setState("warning value")}>
            warning value
          </button>
        </div>
      </div>
    );
  },
];
