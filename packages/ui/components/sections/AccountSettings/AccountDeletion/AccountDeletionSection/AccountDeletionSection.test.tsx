import { mount } from "enzyme";
import { AccountDeletionSection } from "ui";
import * as apiHooks from "ui/Hooks/ApiHooks";
import { getMountedComponent, getTestId, waitFor } from "utils";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const selectors = {
  suspendBtn: "SuspendAccountBtn",
};

describe("AccountDeletionSection render tests", () => {
  it("should call suspend mutation on suspend btn", async () => {
    const mockMutate = jest.fn();
    jest.mock(
      "ui",
      (): Partial<typeof apiHooks> => ({
        useSuspendAccountMutation: jest.fn().mockReturnValue({
          mutate: mockMutate,
        }),
      })
    );
    const wrapper = mount(
      <QueryClientProvider client={new QueryClient()}>
        <AccountDeletionSection />
      </QueryClientProvider>
    );
    let suspendBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.suspendBtn)
    );

    expect(suspendBtn.length).toBe(1);

    await waitFor(() => {
      suspendBtn.simulate("click");
      expect(mockMutate).toBeCalled();
    });
  });
});
