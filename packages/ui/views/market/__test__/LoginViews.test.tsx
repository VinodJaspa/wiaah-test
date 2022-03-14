import { mount } from "enzyme";
import { Login } from "../index";
import React from "react";

export interface ViewsSettings {
  loginView: {
    selection: string;
    type: "login";
  };
  BuyerSignupView: {
    selection: string;
    type: "buyer-signup";
  };
  SellerSignupView: {
    selection: string;
    type: "seller-signup";
  };
}

const { BuyerSignupView, SellerSignupView, loginView }: ViewsSettings = {
  loginView: {
    selection: "#LoginView",
    type: "login",
  },
  BuyerSignupView: {
    selection: "#BuyerSignupView",
    type: "buyer-signup",
  },
  SellerSignupView: {
    selection: "#SellerSignupView",
    type: "seller-signup",
  },
};

const { CreateNewAccountButton } = {
  CreateNewAccountButton: {
    selection: "#CreateNewAccountBtn",
  },
};

describe("login compoenent render diffrerent Views", () => {
  it("should render login view when logintype prop equals 'login'", () => {
    const component = mount(<Login loginType={loginView.type} />);
    const loginSection = component.find(loginView.selection);

    expect(component.prop("loginType")).toBe(loginView.type);
    expect(loginSection.length).toBe(1);
  });

  it("should render buyer signup view when logintype prop equals 'buyer-signup'", () => {
    const component = mount(<Login loginType={BuyerSignupView.type} />);
    const buyerSignupSection = component.find(BuyerSignupView.selection);

    expect(component.prop("loginType")).toBe(BuyerSignupView.type);
    expect(buyerSignupSection.length).toBe(1);
    component.unmount();
  });

  it("should render seller signup view when logintype prop equals 'seller-signup'", () => {
    const component = mount(<Login loginType={SellerSignupView.type} />);
    const sellerSignupSection = component.find(SellerSignupView.selection);

    expect(component.prop("loginType")).toBe(SellerSignupView.type);
    expect(sellerSignupSection.length).toBe(1);
    component.unmount();
  });
});

describe("test create new account button functionanlty", () => {
  it("should be only 1 create new account button", () => {
    const component = mount(<Login loginType="login" />);
    const createAccountButton = component.find(
      CreateNewAccountButton.selection
    );

    expect(createAccountButton.length).toBeGreaterThan(1);
    component.unmount();
  });
});
