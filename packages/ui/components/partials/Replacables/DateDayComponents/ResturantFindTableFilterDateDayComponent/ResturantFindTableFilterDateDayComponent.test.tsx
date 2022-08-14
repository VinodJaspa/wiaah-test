import React from "react";
import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { ResturantFindTableFilterDateDayComponent } from "./ResturantFindTableFilterDateDayComponent";

describe("RestaurantFindTableFilterDataDisplay", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <ResturantFindTableFilterDateDayComponent
        active={false}
        currentMonth={true}
        dayNum={5}
      />
    );
  });
  it("should render the day number properly", () => {
    expect(wrapper.text()).toBe("5");
  });
});
