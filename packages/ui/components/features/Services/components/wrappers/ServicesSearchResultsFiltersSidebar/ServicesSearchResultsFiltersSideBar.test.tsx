import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { getTestId, waitFor } from "utils";
import { ServicesSearchResultsFiltersSidebar } from "./ServicesSearchResultsFiltersSidebar";

const selectors = {
  child: "child",
  showMapbutton: "FiltersSideBarShowMapButton",
};

const MockChild = () => {
  return <div data-testid="child"></div>;
};

describe("ServicesSearchResultsFiltersSideBar render tests", () => {
  let wrapper: ReactWrapper;
  let showMapButton: ReactWrapper;
  let onMapMockFn: jest.Mock;

  beforeEach(() => {
    onMapMockFn = jest.fn();
    wrapper = mount(
      <ServicesSearchResultsFiltersSidebar onShowOnMap={onMapMockFn}>
        <MockChild />
      </ServicesSearchResultsFiltersSidebar>
    );
    showMapButton = wrapper.find(getTestId(selectors.showMapbutton));
  });

  it("should render child properly", () => {
    console.log(wrapper.debug());
    expect(wrapper.find(getTestId(selectors.child)).length).toBe(1);
  });
  it("should have button to show service on map", () => {
    expect(showMapButton.length).toBe(1);
  });
  it("should trigger onMapClick", async () => {
    showMapButton.simulate("click");
    expect(onMapMockFn).toBeCalledTimes(1);
  });
});
