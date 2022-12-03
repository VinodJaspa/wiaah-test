import { Category } from "types";

export const categories: Category[] = [
  {
    name: "men",
    subCategories: [
      {
        name: "outdoor",
        subCategories: [
          {
            name: "jackets",
            subCategories: [],
          },
          {
            name: "blazers",
            subCategories: [],
          },
          {
            name: "boots",
            subCategories: [],
          },
        ],
      },
      {
        name: "Indoor",
        subCategories: [
          {
            name: "pejams",
            subCategories: [],
          },
          {
            name: "pants",
            subCategories: [],
          },
          {
            name: "slippers",
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "women",
    subCategories: [
      {
        name: "outdoor",
        subCategories: [
          {
            name: "dresses",
            subCategories: [],
          },
          {
            name: "bags",
            subCategories: [],
          },
          {
            name: "sandels",
            subCategories: [],
          },
        ],
      },
      {
        name: "Indoor",
        subCategories: [
          {
            name: "pejams",
            subCategories: [],
          },
          {
            name: "shorts",
            subCategories: [],
          },
          {
            name: "jip",
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "T-shirts",
    subCategories: [],
  },
];
