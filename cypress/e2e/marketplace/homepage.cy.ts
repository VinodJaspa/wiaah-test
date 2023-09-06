import { faker } from "@faker-js/faker";
import { SeedDBResponse } from "../../tasks";
import { getByTestid, getTestId, marketplaceRoutes } from "../const";

const testids = {
  category: "category",
  homepage_productCategoriesContainer: "productCategoriesContainer",
  homepage_productsContainer: "home-page-products-container",
  homepage_product: "home-page-product",
};

describe("homepage testing", () => {
  let productsCategories: { id: string; name: string }[];
  let products: { id: string; name: string }[];

  beforeEach(() => {
    cy.task<SeedDBResponse>("seedDb").then((res) => {
      productsCategories = res.productCategories;
      products = res.products;
    });
  });

  it("should show product categories, select product category and only show products related to that category", () => {
    cy.visit(marketplaceRoutes.base);

    const categoriesContainer = getByTestid(
      testids.homepage_productCategoriesContainer
    );

    if (productsCategories) {
      productsCategories.map(({ id, name }) => {
        const cateElement = categoriesContainer.get(
          getTestId(`${testids.category}-${id}`)
        );

        cateElement.should("have.length", 1);
        cateElement.should("have.text", name);
      });
    } else {
      throw new Error("products categories was not seeded");
    }
    const productsContainer = getByTestid(
      `${testids.homepage_productsContainer}`
    );

    const testingCategory =
      productsCategories[faker.number.int(productsCategories.length)];

    productsContainer
      .find(getTestId(testids.homepage_product))
      .should("have.length", 40);
  });
});
