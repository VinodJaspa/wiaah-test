import React from "react";
import { useAddProductTrackingLink } from "../AddProductTrackingLink";
import { mount, ReactWrapper } from "enzyme";
import { waitFor } from "utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
};

describe("useAddProductTrackingLink hook test", () => {
  let addlinkMock: jest.Mock;
  let wrapper: ReactWrapper;
  beforeEach(() => {
    addlinkMock = jest.fn();
    jest.mock("api", () => {
      jest.fn();
    });
    wrapper = mount(
      (() => {
        const { mutate, isLoading } = useAddProductTrackingLink();
        React.useEffect(() => {
          mutate({ productId: "123", trackingLink: "link" });
        }, []);
        return <div data-isLoading={isLoading} />;
      })(),
      {
        wrappingComponent: () => (
          <Wrapper>
            <></>
          </Wrapper>
        ),
      },
    );
  });

  it("should be called", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(addlinkMock).toBeCalled();
      expect(addlinkMock).toBeCalledWith({
        productId: "123",
        trackingLink: "link",
      });
    });
  });
});
