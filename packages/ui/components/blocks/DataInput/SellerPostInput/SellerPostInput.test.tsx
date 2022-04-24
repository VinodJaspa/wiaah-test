import React from "react";
import { SellerPostInput } from "./index";
import { fireEvent, render, screen, cleanup } from "ui/utils/test-utils";

// testid selectors
// data-testid="selectorName"
const selectors = {
  userImage: "UserImage",
  postInput: "PostInput",
  submitBtn: "SubmitBtn",
  attachPhotoBtn: "AttachPhotoBtn",
  attachVideoBtn: "AttachVideoBtn",
  attachActionBtn: "AttachActionBtn",
  addLocationBtn: "AddPostLocationBtn",
  addStatusBtn: "AddStatusBtn",
};

afterEach(cleanup);

describe("SellerPostInput render and functional tests", () => {
  let userImage: HTMLImageElement;
  let postInput: HTMLInputElement;
  let submitBtn: HTMLButtonElement;
  let attachPhotoBtn: HTMLElement;
  let attachVideoBtn: HTMLElement;
  let attachActionBtn: HTMLElement;
  let addLocationBtn: HTMLElement;
  let addStatusBtn: HTMLElement;
  let onSubmitMock: jest.Mock;

  beforeEach(async () => {
    onSubmitMock = jest.fn();
    const wrapper = render(
      <SellerPostInput
        onPostSubmit={onSubmitMock}
        userName="test"
        userPhotoSrc="/wiaah_logo.png"
      />
    );
    userImage = (await wrapper.findByTestId(
      selectors.userImage
    )) as HTMLImageElement;
    postInput = wrapper.getByTestId(selectors.postInput) as HTMLInputElement;
    submitBtn = wrapper.getByTestId(selectors.submitBtn) as HTMLButtonElement;
    attachPhotoBtn = wrapper.getByTestId(selectors.attachPhotoBtn);
    attachVideoBtn = wrapper.getByTestId(selectors.attachVideoBtn);
    attachActionBtn = wrapper.getByTestId(selectors.attachActionBtn);
    addLocationBtn = wrapper.getByTestId(selectors.addLocationBtn);
    addStatusBtn = wrapper.getByTestId(selectors.addStatusBtn);
  });

  it("should have button with the text 'post'", () => {
    expect(submitBtn.textContent).toBe("post");
  });
  it("should trigger onPostSubmit callback with the right value on post button", () => {
    fireEvent.change(postInput, { target: { value: "test post" } });
    fireEvent.click(submitBtn);
    expect(onSubmitMock).toBeCalledTimes(1);
    expect(onSubmitMock).toBeCalledWith("test post");
  });
});

describe("SellerPostInput Snapshot tests", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <SellerPostInput userName="test" userPhotoSrc="testsrc" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
