import { shallow } from "enzyme";
import React from "react";
import { TimeRangeDisplay } from "./TimeRangeDisplay";

describe("TimeRangeDisplay", () => {
  it("should display minutes if provided minutes is less than 60", () => {
    expect(shallow(<TimeRangeDisplay rangeInMinutes={[30, 50]} />).text()).toBe(
      "30 mins-50 mins"
    );
  });
  it("should display hours if provided minutes is more than 60", () => {
    expect(shallow(<TimeRangeDisplay rangeInMinutes={[60, 90]} />).text()).toBe(
      "1 hrs-1:30 hrs"
    );
  });
});
