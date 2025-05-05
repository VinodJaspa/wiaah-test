import { Meta, StoryFn } from "@storybook/react";
import { VehiclesSelectableList } from "./VehicleSelectableList";
import { storybookVehicleListsTitle } from "utils";

export default {
  title: "UI / Features /Vehicle /Lists /VehiclesSelectableList",
  component: VehiclesSelectableList,
} as Meta<typeof VehiclesSelectableList>;

export const Default = {
  args: {
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
  },
};
