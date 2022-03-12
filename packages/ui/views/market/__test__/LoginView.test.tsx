import { mount } from "enzyme";
import React from "react";
import { LoginView } from "../LoginView";

const { email, password, remember_me } = {
  email: {
    text: "example@test.com",
    name: "email",
    selector: "#EmailInput",
  },
  password: {
    text: "password123",
    name: "password",
    selector: "#PasswordInput",
  },
  remember_me: {
    name: "remember_me",
    selector: "#RememberMeCheckbox",
  },
};
const { login, signup } = {
  login: {
    name: "loginBtn",
    selector: "#LoginBtn",
  },
  signup: {
    name: "createAccountBtn",
    selector: "#CreateNewAccountBtn",
  },
};

describe("loginView inputs functionality", () => {
  it("should be only 1 email, password and remember_me inputs", () => {
    const component = mount(<LoginView />);
    let emailInput = component.find(email.selector);
    let passwordInput = component.find(password.selector);
    let rememberMeCheckbox = component.find(remember_me.selector);

    expect(rememberMeCheckbox.length).toBe(1);
    expect(emailInput.length).toBe(1);
    expect(passwordInput.length).toBe(1);
  });

  it("should update text input state on typing", async () => {
    const component = mount(<LoginView />);
    let emailInput = component.find(email.selector);
    let passwordInput = component.find(password.selector);

    // simulate user typing
    emailInput.simulate("change", {
      target: { value: email.text, name: email.name },
    });
    passwordInput.simulate("change", {
      target: { name: password.name, value: password.text },
    });

    // get updated inputs
    emailInput = component.find(email.selector);
    passwordInput = component.find(password.selector);

    expect(emailInput.props().value).toBe(email.text);
    expect(passwordInput.props().value).toBe(password.text);
  });

  it("remember me should alternate between false and true on click", () => {
    const component = mount(<LoginView />);
    let RememberMeCheckbox = component.find(remember_me.selector);

    // simulate user typing
    RememberMeCheckbox.simulate("click");
    RememberMeCheckbox = component.find(remember_me.selector);
    expect(RememberMeCheckbox.props().checked).toBe(true);

    RememberMeCheckbox.simulate("click");
    RememberMeCheckbox = component.find(remember_me.selector);
    expect(RememberMeCheckbox.props().checked).toBe(false);
  });
});

describe("login buttons", () => {
  it("should exists", () => {
    const component = mount(<LoginView />);
    const loginBtn = component.find(login.selector);
    const createNewAccountBtn = component.find(signup.selector);

    expect(loginBtn.length).toBe(1);
    expect(createNewAccountBtn.length).toBe(1);
  });
});

describe("login functaionalty", () => {
  it("should call api function on login button click", () => {
    const LoginApiMockFn = jest.fn();

    jest.doMock(
      "../../../../apps/market/ApiCalls/Authenticating/Login",
      () => ({
        __esModule: true,
        default: {
          HandleLoginRequest: LoginApiMockFn,
        },
      })
    );

    const component = mount(<LoginView />);
    const loginBtn = component.find("#LoginBtn");

    loginBtn.simulate("click");

    expect(LoginApiMockFn).toBeCalledTimes(1);
  });

  it("should call the api function with the right credentails as user typed", () => {
    const LoginApiMockFn = jest.fn();

    jest.doMock(
      "../../../../apps/market/ApiCalls/Authenticating/Login",
      () => ({
        __esModule: true,
        default: {
          HandleLoginRequest: LoginApiMockFn,
        },
      })
    );

    const component = mount(<LoginView />);
    let emailInput = component.find(email.selector);
    let passwordInput = component.find(password.selector);
    let RememberMeCheckbox = component.find(remember_me.selector);
    const loginBtn = component.find(login.selector);

    // simulate user input
    emailInput.simulate("change", {
      target: { value: email.text, name: email.name },
    });
    passwordInput.simulate("change", {
      target: { name: password.name, value: password.text },
    });
    RememberMeCheckbox.simulate("click");

    loginBtn.simulate("click");

    expect(LoginApiMockFn).toBeCalledWith({
      email: email.text,
      password: password.text,
      remember_me: true,
    });
  });
});
