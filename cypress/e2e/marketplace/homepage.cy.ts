import { SeedDBResponse } from "../../tasks";
import { getByTestid, getTestId, marketplaceRoutes } from "../const";

const testids = {
  category: "category",
  productCategoriesContainer: "productCategoriesContainer",
};

describe("homepage testing", () => {
  let productsCategoriesIds: string[];

  beforeEach(() => {
    cy.task<SeedDBResponse>("seedDb").then((res) => {
      productsCategoriesIds = res.productCategoriesIds;
    });
  });

  it("should show product categories", () => {
    cy.visit(marketplaceRoutes.base);

    const categoriesContainer = getByTestid(testids.productCategoriesContainer);

    productsCategoriesIds.map((cateId) => {
      const cateElement = categoriesContainer.get(
        getTestId(`${testids.category}-${cateId}`)
      );

      cateElement.should("have.length", 1);
    });
  });
});
