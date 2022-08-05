import { ComponentMeta, ComponentStory } from "@storybook/react";
import { runIfFn, storybookOtherServicesDataDisplayTitle } from "utils";
import {
  ServicePropertiesSwticher,
  ServiceProperties,
} from "./ServicePropertiesSwticher";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServicePropertiesSwitcher",
  component: ServicePropertiesSwticher,
} as ComponentMeta<typeof ServicePropertiesSwticher>;

const template: ComponentStory<typeof ServicePropertiesSwticher> = (args) => (
  <div className="flex flex-col items-center gap-4">
    <ServicePropertiesSwticher {...args} />

    <div className="flex flex-wrap gap-4">
      {Object.entries(ServiceProperties).map((value, i) => (
        <div className="flex gap-2 items-center whitespace-nowrap">
          {runIfFn(value[1])}
          <p>{value[0]}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Default = template.bind({});
Default.args = {
  slug: "a/c",
};
