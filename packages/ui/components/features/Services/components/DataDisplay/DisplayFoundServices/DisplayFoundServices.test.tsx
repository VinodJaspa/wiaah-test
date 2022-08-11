import { shallow, ShallowWrapper } from "enzyme";
import { DisplayFoundServices } from "./DisplayFoundServices";
import React from "react";
describe("DisplayFoundServices tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DisplayFoundServices location="switzerland" servicesNum={340} />
    );
  });
  it("should display the right sentence", () => {
    expect(wrapper.text()).toBe(
      `We found for you in ${"switzerland"} ${340} booking services that are available just for you. Do not hesitate to book.`
    );
  });
});
