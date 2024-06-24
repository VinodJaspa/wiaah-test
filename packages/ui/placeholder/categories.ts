import { Category } from "types";

export const categories: Category[] = [
  {
    id: "1",
    name: "men",
    subCategories: [
      {
        id: "1",
        name: "outdoor",
        subCategories: [
          {
            id: "1",
            name: "jackets",
            subCategories: [],
          },
          {
            id: "2",
            name: "blazers",
            subCategories: [],
          },
          {
            id: "3",
            name: "boots",
            subCategories: [],
          },
        ],
      },
      {
        id: "1",
        name: "Indoor",
        subCategories: [
          {
            id: "1",
            name: "pejams",
            subCategories: [],
          },
          {
            id: "2",
            name: "pants",
            subCategories: [],
          },
          {
            id: "3",
            name: "slippers",
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: "1",
    name: "women",
    subCategories: [
      {
        id: "1",
        name: "outdoor",
        subCategories: [
          {
            id: "1",
            name: "dresses",
            subCategories: [],
          },
          {
            id: "2",
            name: "bags",
            subCategories: [],
          },
          {
            id: "3",
            name: "sandels",
            subCategories: [],
          },
        ],
      },
      {
        id: "1",
        name: "Indoor",
        subCategories: [
          {
            id: "1",
            name: "pejams",
            subCategories: [],
          },
          {
            id: "2",
            name: "shorts",
            subCategories: [],
          },
          {
            id: "3",
            name: "jip",
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: "1",
    name: "T-shirts",
    subCategories: [],
  },
];
