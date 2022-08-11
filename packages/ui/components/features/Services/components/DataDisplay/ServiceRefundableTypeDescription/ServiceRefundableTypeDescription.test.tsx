import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import {
  ServiceRefundableTypeDescription,
  ServiceRefundableTypeDescriptionProps,
} from "./ServiceRefundableTypeDescription";

describe("ServiceRefundableTypeDescription tests", () => {
  let wrapper: ShallowWrapper;
  let props: ServiceRefundableTypeDescriptionProps;
  beforeEach(() => {
    props = {
      bookedDate: new Date(2022, 7, 28),
      cost: 16,
      duration: 5,
    };
    wrapper = shallow(<ServiceRefundableTypeDescription {...props} />);
  });
  it("should render 'Fully refundable before' and then the date in the format of '*month name* *day number*' if a duration is specificed", () => {
    expect(wrapper.text()).toBe(`Fully refundable before Sep 2`);
  });
  it("should render 'Refundable before booked date' if a duration is not specified but a cost is specified", () => {
    wrapper = shallow(
      <ServiceRefundableTypeDescription {...props} duration={0} />
    );
    expect(wrapper.text()).toBe(`Refundable before booked date`);
  });
  it("should render 'Non-refundable' if a duration is not specified and a cost is not specified", () => {
    wrapper = shallow(
      <ServiceRefundableTypeDescription {...props} duration={0} cost={0} />
    );
    expect(wrapper.text()).toBe(`Non-refundable`);
  });
});
