import { mount } from "enzyme";
import React from "react";
import { Login } from "../index";

beforeEach(() => {});

afterEach(() => {});

describe("Login Component", () => {
  it("should render login view when logintype prop equals 'login'", () => {
    const component = mount(<Login loginType="login" />);
    const emailInput = component.find("[role='email']");
    const passwordInput = component.find("[role='password']");
    // make sure there is only 1 email input and 1 password input
    expect(emailInput).not.toBeGreaterThan(1);
    expect(passwordInput).not.toBeGreaterThan(1);
    // make sure email and password inputs are there
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });
});
