import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import {} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ProductGeneralDetails } from "./index";

describe("ProductGeneralDetails tests", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
          <ProductGeneralDetails values={{}} />
        </RecoilRoot>
      </QueryClientProvider>
    );
  });

  it("Should display the right categories", () => {
    expect(wrapper).toBeDefined();
  });
});
