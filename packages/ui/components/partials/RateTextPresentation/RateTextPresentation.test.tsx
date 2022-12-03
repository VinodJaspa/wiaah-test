import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { RateTextPresentation } from "./RateTextPresentation";
describe("RateTextPresentation", () => {
  let wrapper: ShallowWrapper;
  it("should render Excellect if the rate is 5", () => {
    wrapper = shallow(<RateTextPresentation rate={5} />);
    expect(wrapper.text()).toBe("Excellent");
  });
  it("should render Fabulous if the rate is between 4 and 5", () => {
    wrapper = shallow(<RateTextPresentation rate={4} />);
    expect(wrapper.text()).toBe("Fabulous");
  });
  it("should render Good if the rate is between 3 and 4", () => {
    wrapper = shallow(<RateTextPresentation rate={3} />);
    expect(wrapper.text()).toBe("Good");
  });
  it("should render Considerable if the rate is between 2 and 3", () => {
    wrapper = shallow(<RateTextPresentation rate={2} />);
    expect(wrapper.text()).toBe("Considerable");
  });
  it("should render bad if the rate is less than 2", () => {
    wrapper = shallow(<RateTextPresentation rate={1} />);
    expect(wrapper.text()).toBe("Bad");
  });
});
