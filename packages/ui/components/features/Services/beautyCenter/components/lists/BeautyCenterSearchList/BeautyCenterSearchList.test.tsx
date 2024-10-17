import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { RecommendedBeautyCenterSearchList } from "./BeautyCenterSearchList";
import { FetchingMock, waitFor } from "utils";
import { getRecommendedBeautyCenterFetcher } from "api";
import { AsyncReturnType } from "types";
import { QueryClient, QueryClientProvider } from "react-query";
import { BeautyCenterRecommendedSearchCard } from "@UI";

const mockedData = [...Array(15)].map((_, i) => ({
  title: "Hair Salon",
  price: 54,
  duration: 3,
  category: "category",
  id: `${i}`,
  name: "Wiaah Beauty",
  rate: 5,
  reviews: 1565,
  thumbnail:
    "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/Tacha+Beauty+Center-desktop.jpg",
}));

describe("BeautyCenterSearchList tests", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <QueryClientProvider client={new QueryClient()}>
        <RecommendedBeautyCenterSearchList treatments={mockedData} />
      </QueryClientProvider>,
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
      { interval: 200, timeout: 2000 },
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
          BeautyCenterRecommendedSearchCard,
        );
      },
      { interval: 200, timeout: 2000 },
    );
  });
});
