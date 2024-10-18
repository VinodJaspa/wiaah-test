import { ComponentMeta, ComponentStory } from "@storybook/react";
import { runIfFn, storybookOtherServicesDataDisplayTitle } from "utils";
import {
  ServiceProperties,
  ServicePropertiesSwticher, // Component, not the props type
} from "./ServicePropertiesSwticher";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServicePropertiesSwitcher",
  component: ServicePropertiesSwticher, // Component, not the props type
} as ComponentMeta<typeof ServicePropertiesSwticher>;

const template: ComponentStory<typeof ServicePropertiesSwticher> = (args) => (
  <div className="flex flex-col items-center gap-4">
    <ServicePropertiesSwticher {...args} />

    <div className="flex flex-wrap gap-4">
      {Object.entries(ServiceProperties).map(([key, IconComponent], i) => (
        <div key={i} className="flex gap-2 items-center whitespace-nowrap">
          {runIfFn(IconComponent as React.FC<any>)}
          <p>{key}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Default = template.bind({});
Default.args = {
  slug: "a/c",
};
