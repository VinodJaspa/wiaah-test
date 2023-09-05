export const marketplaceEndPoint = "http://localhost:3002";
export const SellerEndPoint = "http://localhost:3000";

export function getTestId(testId: string) {
  return `[data-testid="${testId}"]`;
}

export function getByTestid<TElement>(testId: string) {
  return cy.get<TElement>(getTestId(testId));
}

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

export const sellerRoutes = {
  base: "http://localhost:3000",
  get index() {
    return this.base + "/";
  },
  get login() {
    return this.base + "/auth/login";
  },
};

export const marketplaceRoutes = {
  base: "http://localhost:3002",
  get createProduct() {
    return this.base + "/product/new";
  },
};
