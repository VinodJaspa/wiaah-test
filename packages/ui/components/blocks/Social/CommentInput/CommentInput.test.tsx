import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { CommentInput } from "ui";
import { getMountedComponent } from "ui/components/helpers/test/getMountedComponent";

const selectors = {
  commentInput: "[data-testid='CommentInput']",
  cameraBtn: "[data-testid='CommentCameraBtn']",
  submitBtn: "[data-testid='CommentSubmitBtn']",
};

describe("CommentInput render tests", () => {
  let wrapper: ShallowWrapper;
  let commentInput: ShallowWrapper;
  let cameraBtn: ShallowWrapper;
  let submitBtn: ShallowWrapper;
  let onCameraClickMock: jest.Mock;
  let onSubmitClickMock: jest.Mock;
  beforeEach(() => {
    onCameraClickMock = jest.fn();
    onSubmitClickMock = jest.fn();
    wrapper = shallow(
      <CommentInput
        onCameraClick={onCameraClickMock}
        onCommentSubmit={onSubmitClickMock}
      />
    );
    commentInput = wrapper.find(selectors.commentInput);
    cameraBtn = wrapper.find(selectors.cameraBtn);
    submitBtn = wrapper.find(selectors.submitBtn);
  });

  it("should render properly", () => {
    shallow(<CommentInput />);
  });
  it("should call onCamera callback on camera icon click", () => {
    expect(cameraBtn.length).toBe(1);
    cameraBtn.simulate("click");
    expect(onCameraClickMock).toBeCalledTimes(1);
  });
  it("should call onCommentSubmit callback on submit icon click ", () => {
    expect(submitBtn.length).toBe(1);
    submitBtn.simulate("click");
    expect(onSubmitClickMock).toBeCalledTimes(1);
  });
});

describe("CommentInput functionallity", () => {
  let wrapper: ReactWrapper;
  let commentInput: ReactWrapper;
  let cameraBtn: ReactWrapper;
  let submitBtn: ReactWrapper;
  let onCameraClickMock: jest.Mock;
  let onSubmitClickMock: jest.Mock;
  beforeEach(() => {
    onCameraClickMock = jest.fn();
    onSubmitClickMock = jest.fn();
    wrapper = mount(
      <CommentInput
        onCameraClick={onCameraClickMock}
        onCommentSubmit={onSubmitClickMock}
      />
    );
    commentInput = getMountedComponent(wrapper, selectors.commentInput, 3);
    cameraBtn = getMountedComponent(wrapper, selectors.cameraBtn, 3);
    submitBtn = getMountedComponent(wrapper, selectors.submitBtn, 3);
  });
  it("should call onCommentSubmit with the right comment", () => {
    const comment = "test Comment";
    expect(commentInput.length).toBe(1);
    expect(submitBtn.length).toBe(1);

    commentInput.simulate("change", { target: { value: comment } });

    wrapper.update();

    submitBtn.simulate("click");

    expect(onSubmitClickMock).toBeCalledTimes(1);
    expect(onSubmitClickMock).toBeCalledWith(comment);
  });
});

describe("CommentInput snapshot tests", () => {
  let wrapper: ShallowWrapper;
  let onCameraClickMock: jest.Mock;
  let onSubmitClickMock: jest.Mock;
  beforeEach(() => {
    onCameraClickMock = jest.fn();
    onSubmitClickMock = jest.fn();
    wrapper = shallow(
      <CommentInput
        onCameraClick={onCameraClickMock}
        onCommentSubmit={onSubmitClickMock}
      />
    );
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
