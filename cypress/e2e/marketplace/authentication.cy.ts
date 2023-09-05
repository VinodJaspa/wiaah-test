import { getByTestid, marketplaceEndPoint } from "../const";

const testIds = {
  authBtn: "auth-btn",
};

describe("marketplace authentication tests", async () => {
  it("should navigate to login", () => {
    cy.visit(marketplaceEndPoint);

    const btn = getByTestid(testIds.authBtn);
    btn.should("have.text", "Sign in");
    btn.click();
    cy.url().should("have.text", "/auth/sign-in");
  });
});
