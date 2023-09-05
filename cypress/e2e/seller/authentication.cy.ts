import { SellerEndPoint, getByTestid, sellerRoutes } from "../const";

const testids = {
  loginBtn: "sign-in-btn",
  usernameInput: "login-username-input",
  passwordInput: "login-password-input",
  rememberMeInput: "login-remember-me-input",
  forgotPasswordBtn: "login-forgot-password-btn",
  submitLoginFormBtn: "login-form-submit-btn",
};

describe("authentication flow", () => {
  it("should send to login from home page", () => {
    cy.visit(SellerEndPoint);
    const btn = getByTestid(testids.loginBtn);
    btn.should("have.text", "Sign In");

    btn.click();

    cy.url().should("include", sellerRoutes.login);

    const usernameInput = getByTestid<HTMLInputElement>(testids.usernameInput);
    const passwordInput = getByTestid(testids.passwordInput);
    const submitBtn = getByTestid(testids.submitLoginFormBtn);

    usernameInput.type("test username");

    usernameInput.should("have.text", "test usernames");
    passwordInput.type("test password").should("have.text", "test passwords");
  });
});
