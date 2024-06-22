import { ShippingMothed } from "types";

export const shippingMotheds: ShippingMothed[] = [
  {
    name: "International",
    value: "international",
    deliveryTime: {
      from: 7,
      to: 14,
    },
    id: "method3",
    cost: 20,
    description: "Shipping to international destinations outside EU.",
  },
];
