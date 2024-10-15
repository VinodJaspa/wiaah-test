import { cleanup, render, fireEvent } from "@testing-library/react"; // Import fireEvent
import React from "react";
import { SellerPostInput } from "./index";

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

  beforeEach(() => {
    onSubmitMock = jest.fn();
    const { getByTestId } = render(
      <SellerPostInput
        onPostSubmit={onSubmitMock}
        userName="test"
        userPhotoSrc="/wiaah_logo.png"
      />,
    );

    // No need to await, using synchronous querying
    userImage = getByTestId(selectors.userImage) as HTMLImageElement;
    postInput = getByTestId(selectors.postInput) as HTMLInputElement;
    submitBtn = getByTestId(selectors.submitBtn) as HTMLButtonElement;
    attachPhotoBtn = getByTestId(selectors.attachPhotoBtn);
    attachVideoBtn = getByTestId(selectors.attachVideoBtn);
    attachActionBtn = getByTestId(selectors.attachActionBtn);
    addLocationBtn = getByTestId(selectors.addLocationBtn);
    addStatusBtn = getByTestId(selectors.addStatusBtn);
  });

  it("should have button with the text 'post'", () => {
    expect(submitBtn.textContent).toBe("post");
  });

  it("should trigger onPostSubmit callback with the right value on post button", () => {
    fireEvent.change(postInput, { target: { value: "test post" } });
    fireEvent.click(submitBtn);
    expect(onSubmitMock).toHaveBeenCalledTimes(1); // Use toHaveBeenCalledTimes instead of toBeCalledTimes
    expect(onSubmitMock).toHaveBeenCalledWith("test post"); // Use toHaveBeenCalledWith instead of toBeCalledWith
  });
});

describe("SellerPostInput Snapshot tests", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <SellerPostInput userName="test" userPhotoSrc="testsrc" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
