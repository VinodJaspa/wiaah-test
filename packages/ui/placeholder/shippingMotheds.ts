import { ShippingMothed } from "types";

export const shippingMotheds: ShippingMothed[] = [
  {
    cost: 0,
    name: "Click & Collect",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    id: "1",
    value: "click_and_collect",
    deliveryTime: {
      from: 4,
      to: 6,
    },
  },
  {
    cost: 0,
    name: "European union",
    description: "desct",
    value: "european_union",
    id: "2",
    deliveryTime: {
      from: 4,
      to: 6,
    },
  },
  {
    cost: 0.99,
    name: "International",
    id: "3",
    deliveryTime: {
      from: 4,
      to: 6,
    },
    description: "desc",
    value: "international",
  },
];
