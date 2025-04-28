import { mount } from "enzyme";
import { AccountDeletionSection, useDeleteMyAccountMutation } from "@UI";
import { getMountedComponent, getTestId, waitFor } from "utils";
import { QueryClient, QueryClientProvider } from "react-query";

const mockMutate = jest.fn();
jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useSuspendAccountMutation: jest.fn().mockReturnValue({
    mutate: mockMutate,
  }),
  useDeleteMyAccountMutation: jest.fn(),
}));
const selectors = {
  suspendBtn: "SuspendAccountBtn",
  deleteModal: "delete-modal",
};

describe("AccountDeletionSection render tests", () => {
  const mockDeleteMut = useDeleteMyAccountMutation as jest.Mock;

  it("should call suspend mutation on suspend btn", async () => {
    const wrapper = mount(
      <QueryClientProvider client={new QueryClient()}>
        <AccountDeletionSection />
      </QueryClientProvider>
    );
    const suspendBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.suspendBtn)
    );

    expect(mockDeleteMut).toBeCalledTimes(1);

    expect(suspendBtn.length).toBe(1);

    await waitFor(() => {
      suspendBtn.simulate("click");
      expect(mockMutate).toBeCalled();
    });
  });
});
