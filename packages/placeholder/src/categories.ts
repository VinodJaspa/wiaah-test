import { Category } from "types";

export const categories: Category[] = [
  {
    id: "0",
    name: "men",
    subCategories: [
      {
        id: "0",
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
        id: "0",
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
            id: "2",
            name: "dresses",
            subCategories: [],
          },
          {
            id: "3",
            name: "bags",
            subCategories: [],
          },
          {
            id: "4",
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
            id: "2",
            name: "pejams",
            subCategories: [],
          },
          {
            id: "3",
            name: "shorts",
            subCategories: [],
          },
          {
            id: "4",
            name: "jip",
            subCategories: [],
          },
        ],
      },
    ],
  },
];
