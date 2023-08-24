import { getByTestid } from "../../support/component";

const testIds = {
  authBtn: "auth-btn",
};

describe("marketplace authentication tests", async () => {
  it("should navigate to login", () => {
    cy.visit("http://localhost:3002");

    const btn = getByTestid(testIds.authBtn).should("have.text", "Sign in");
  });
});
