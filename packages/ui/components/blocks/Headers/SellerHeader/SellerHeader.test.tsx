import React from "react";
import { render, fireEvent, RenderResult } from "ui/utils/test-utils";

import { SellerHeader } from ".";
const selectors = {
  searchInput: "SearchInput",
  notifiactionsBtn: "NotificationsBtn",
  messagesBtn: "UserMessagesBtn",
  submitSearchBtn: "SubmitSearchBtn",
  messagesPopover: "UserMessagesPopover",
  notificationsPopover: "NotificationsPopover",
};

describe("SellerHeader tests", () => {
  let wrapper: RenderResult;
  let searchInput: HTMLInputElement;
  let notifiactionsBtn: HTMLButtonElement;
  let messagesBtn: HTMLButtonElement;
  let submitSearchBtn: HTMLButtonElement;
  let messagesPopover: HTMLElement | null;
  let notificationsPopover: HTMLElement | null;
  let onSearchSubmitMock: jest.Mock;

  beforeEach(() => {
    onSearchSubmitMock = jest.fn();
    wrapper = render(<SellerHeader onSearchSubmit={onSearchSubmitMock} />);
    searchInput = wrapper.getByRole(selectors.searchInput) as HTMLInputElement;
    notifiactionsBtn = wrapper.getByRole(
      selectors.notifiactionsBtn
    ) as HTMLButtonElement;
    messagesBtn = wrapper.getByRole(selectors.messagesBtn) as HTMLButtonElement;
    submitSearchBtn = wrapper.getByRole(
      selectors.submitSearchBtn
    ) as HTMLButtonElement;

    messagesPopover = wrapper.queryByRole(selectors.messagesPopover);
    notificationsPopover = wrapper.queryByRole(selectors.notificationsPopover);
  });

  it("should change search input value properly", () => {
    fireEvent.change(searchInput, { target: { value: "test value" } });
    expect(searchInput.value).toBe("test value");
  });

  it("should call onSearchSubmit callback with the right search value", () => {
    fireEvent.change(searchInput, { target: { value: "test value cb" } });
    fireEvent.click(submitSearchBtn);
    expect(onSearchSubmitMock).toBeCalledTimes(1);
    expect(onSearchSubmitMock).toBeCalledWith("test value cb");
  });

  it("should not have messages popover shown intitialy", () => {
    expect(messagesPopover).not.toBeInTheDocument();
  });
  it("should not have notifications popover shown intitialy", () => {
    expect(notificationsPopover).not.toBeInTheDocument();
  });

  it("should open messages popover on message button click", () => {
    fireEvent.click(messagesBtn);
    expect(messagesPopover).toBeInTheDocument();
  });

  it("should open notifications popover on message button click", () => {
    fireEvent.click(notifiactionsBtn);
    expect(messagesPopover).toBeInTheDocument();
  });
});

// describe("SellerHeader snapshot tests", () => {
//   it("should match snapshot", () => {
//     const { asFragment } = render(<SellerHeader />);
//     expect(asFragment()).toMatchSnapshot();
//   });
// });
