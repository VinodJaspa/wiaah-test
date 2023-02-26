import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Page from "./index";
import { useAdminSendMailToUsers } from "ui";
import { MailUserType } from "@features/API";
import { getTestId } from "utils";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useAdminSendMailToUsers: jest.fn(),
}));

const testids = {
  sendToOption: "sendToOption",
  sendToSelect: "sendToSelect",
  subject: "subject",
  message: "message",
  sendBtn: "sendBtn",
};

describe("adminSendMailView tests", () => {
  let wrapper: ShallowWrapper;

  let mockUseAdminSendMailToUsers = useAdminSendMailToUsers as jest.Mock;
  let mockSend = jest.fn();

  const mockData: Parameters<
    ReturnType<typeof useAdminSendMailToUsers>["mutate"]
  >[0] = {
    message: "test msg",
    subject: "test subject",
    userType: MailUserType.Subscribers,
  };

  beforeEach(() => {
    mockUseAdminSendMailToUsers.mockReturnValue({
      mutate: mockSend,
    });
    wrapper = shallow(<Page></Page>);
  });

  it("should init the useAdminSendMailToUsers", () => {
    expect(mockUseAdminSendMailToUsers).toBeCalledTimes(1);
    expect(mockSend).not.toBeCalled();

    const options = wrapper.find(getTestId(testids.sendToOption));

    expect(options.length).toBe(Object.keys(MailUserType).length);

    options.forEach((e) => {
      expect(
        Object.values(MailUserType).includes(e.prop("value") as string)
      ).toBe(true);
    });

    wrapper
      .find(getTestId(testids.message))
      .simulate("change", { target: { value: mockData.message } });
    wrapper
      .find(getTestId(testids.subject))
      .simulate("change", { target: { value: mockData.subject } });
    (
      wrapper
        .find(getTestId(testids.sendToSelect))
        .prop("onOptionSelect") as Function
    )(mockData.userType);

    wrapper.find(getTestId(testids.sendBtn)).simulate("click");
    expect(mockSend).toBeCalledWith(mockData);
  });
});
