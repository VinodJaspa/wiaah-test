import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VehiclesSelectableList } from "./VehicleSelectableList";
import { storybookVehicleListsTitle } from "utils";

export default {
  title: storybookVehicleListsTitle + "VehiclesSelectableList",
  component: VehiclesSelectableList,
} as ComponentMeta<typeof VehiclesSelectableList>;

const template: ComponentStory<typeof VehiclesSelectableList> = (args) => (
  <VehiclesSelectableList {...args} />
);

export const Default = template.bind({});
Default.args = {
  vehicles: [...Array(15)].map(() => ({
    id: "321",
    name: "Vehilce",
    pricePerDay: 15,
    thumbnail: "/place-1.jpg",
    cancelationPolicies: [{ cost: 15, duration: 8, id: "132" }],
    vehicleProps: [
      {
        type: "a/c",
        value: true,
      },
    ],
  })),
};
