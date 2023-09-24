import { SeedDBResponse } from "../../tasks";
import { getByTestid, getTestId, marketplaceRoutes } from "../const";

const testids = {
  category: "category",
  homepage_productCategoriesContainer: "productCategoriesContainer",
  homepage_productsContainer: "home-page-products-container",
  homepage_product: "home-page-product",
  productSkeleton: "product-skeleton",
};

describe("homepage testing", () => {
  let productsCategories: { id: string; name: string }[];
  let products: { id: string; name: string; categoryId: string }[];

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

    productsContainer
      .find(getTestId(testids.homepage_product))
      .should("have.length", products.length > 40 ? 40 : products.length);

    const testingCategory = productsCategories.at(0);

    getByTestid(`${testids.category}-${testingCategory.id}`).click();

    cy.get(getTestId(testids.productSkeleton)).should("have.length", 40);

    const cateProducts = products.filter(
      (v) => v.categoryId === testingCategory.id
    );

    cy.find(getTestId(testids.homepage_product), { timeout: 10000 }).should(
      "have.length",
      cateProducts.length > 40 ? 40 : cateProducts.length
    );
  });
});
