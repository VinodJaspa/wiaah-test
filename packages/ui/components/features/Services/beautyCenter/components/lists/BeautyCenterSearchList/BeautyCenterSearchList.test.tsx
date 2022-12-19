import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { RecommendedBeautyCenterSearchList } from "./BeautyCenterSearchList";
import { FetchingMock, waitFor } from "utils";
import { getRecommendedBeautyCenterFetcher } from "api";
import { AsyncReturnType } from "types";
import { QueryClient, QueryClientProvider } from "react-query";
import { BeautyCenterRecommendedSearchCard } from "@UI";

const mockedData = [...Array(15)].map((_, i) => ({
  id: `${i}`,
  name: `name-${i}`,
  thumbnail: `src-${i}`,
  rate: i,
  reviews: 150 + i,
  owners: ["test-1", "test-2"],
}));

let mockFetching = FetchingMock;
jest.mock("api", () => ({
  getRecommendedBeautyCenterFetcher: async () => {
    await mockFetching;
    const res: AsyncReturnType<typeof getRecommendedBeautyCenterFetcher> = {
      data: mockedData,
      hasMore: false,
      total: 150,
    };
    return res;
  },
}));

describe("BeautyCenterSearchList tests", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <QueryClientProvider client={new QueryClient()}>
        <RecommendedBeautyCenterSearchList />
      </QueryClientProvider>
    );
  });
  it("should render spinnerFallback component with isloading props being false durning the fetching procces", () => {
    const spinner = wrapper.find("SpinnerFallback");
    expect(spinner.length).toBe(1);
    expect(spinner.prop("isLoading")).toBe(true);
  });
  it("should start with isloading prop being true, and then update it with false once fetching is done", async () => {
    const spinner = wrapper.find("SpinnerFallback");
    expect(spinner.length).toBe(1);
    expect(spinner.prop("isLoading")).toBe(true);

    await waitFor(
      () => {
        wrapper.update();
        expect(wrapper.find("SpinnerFallback").prop("isLoading")).toBe(false);
      },
      { interval: 200, timeout: 2000 }
    );
  });

  it("should not render serviceSearchGrid until fetching is done", async () => {
    let serviceGrid = wrapper.find("ServiceSearchGrid");
    expect(serviceGrid.length).toBe(0);

    await waitFor(
      () => {
        serviceGrid = wrapper.find("ServicesSearchGrid");
        wrapper.update();
        expect(serviceGrid.length).toBe(1);
        expect(serviceGrid.prop("data")).toEqual(mockedData);
        expect(serviceGrid.prop("component")).toEqual(
          BeautyCenterRecommendedSearchCard
        );
      },
      { interval: 200, timeout: 2000 }
    );
  });
});
