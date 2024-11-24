import { ProductCategoryStatus } from "@features/API";
import { GetCategoryByIdQueryQuery, GetTopProductCategoriesQuery } from "@UI";
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

export const productCategoryByIdPlaceholder: GetCategoryByIdQueryQuery["getProductCategoryById"] =
{
  __typename: "Category",
  id: "category1",
  name: "Electronics",
  status: ProductCategoryStatus.Active, // Replace "ACTIVE" with a valid `ProductCategoryStatus` value
  sortOrder: 1,
  sales: 1500,
};

export const topProductCategoriesPlaceholder: GetTopProductCategoriesQuery["getTopProductCategories"] =
{
  cursor: "cursor1",
  nextCursor: "cursor2",
  hasMore: true,
  total: 5,
  data: [
    {
      id: "cat1",
      name: "Electronics",
      parantId: "root",
      sortOrder: 1,
      status: "ACTIVE" as ProductCategoryStatus, // Replace with your defined enum value
    },
    {
      id: "cat2",
      name: "Fashion",
      parantId: "root",
      sortOrder: 2,
      status: "ACTIVE" as ProductCategoryStatus,
    },
    {
      id: "cat3",
      name: "Home Appliances",
      parantId: "root",
      sortOrder: 3,
      status: "ACTIVE" as ProductCategoryStatus,
    },
    {
      id: "cat4",
      name: "Books",
      parantId: "root",
      sortOrder: 4,
      status: "INACTIVE" as ProductCategoryStatus,
    },
    {
      id: "cat5",
      name: "Sports",
      parantId: "root",
      sortOrder: 5,
      status: "ACTIVE" as ProductCategoryStatus,
    },
  ],
};

export const getTopProductCategoriesPlaceholder: GetTopProductCategoriesQuery["getTopProductCategories"] =
{
  cursor: null, // Adjust to your needs
  nextCursor: "next-cursor-placeholder",
  hasMore: true,
  total: 100,
  data: [
    {
      id: "category-id-0",
      name: "All",
      parantId: null, // Top-level category
      sortOrder: 0,
      status: ProductCategoryStatus.Active,
    },
    {
      id: "category-id-1",
      name: "Holidays Rentals",
      parantId: null, // Top-level category
      sortOrder: 1,
      status: ProductCategoryStatus.Active,
    },
    {
      id: "category-id-2",
      name: "Hotels",
      parantId: null, // Top-level category
      sortOrder: 2,
      status: ProductCategoryStatus.Active,
    },
    {
      id: "category-id-3",
      name: "Restaurants",
      parantId: null, // Top-level category
      sortOrder: 3,
      status: ProductCategoryStatus.Active,
    },
    {
      id: "category-id-4",
      name: "Health Center",
      parantId: null, // Top-level category
      sortOrder: 4,
      status: ProductCategoryStatus.Active,
    },
    {
      id: "category-id-5",
      name: "Vehicle",
      parantId: null, // Top-level category
      sortOrder: 5,
      status: ProductCategoryStatus.Active,
    },
    {
      id: "category-id-6",
      name: "Beauty Center",
      parantId: null, // Top-level category
      sortOrder: 6,
      status: ProductCategoryStatus.Active,
    },
  ],
};
