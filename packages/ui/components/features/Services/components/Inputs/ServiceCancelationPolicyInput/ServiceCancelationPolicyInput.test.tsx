import React from "react";
import {
  ServiceCancelationPolicyInput,
  ServiceCancelationPolicyInputProps,
} from "./ServiceCancelationPolicyInput";
import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils";

const testids = {
  inputLabel: "InputLabel",
  price: "PriceIndicator",
};

describe("ServiceCancelationpolicyInput tests", () => {
  let wrapper: ShallowWrapper;
  let props: ServiceCancelationPolicyInputProps;
  let priceIndicator: ShallowWrapper;
  let inputLabel: ShallowWrapper;
  let mockSelected: jest.Mock;
  beforeEach(() => {
    mockSelected = jest.fn();
    props = {
      cost: 0,
      duration: 5,
      id: "123",
      name: "test",
      onSelected: mockSelected,
    };
    wrapper = shallow(<ServiceCancelationPolicyInput {...props} />);
    priceIndicator = wrapper.find(getTestId(testids.price));
    inputLabel = wrapper.find(getTestId(testids.inputLabel));
  });

  it("should have a Radio component and a ServiceRefundableTypeDescription component in a label tag", () => {
    expect(inputLabel.length).toBe(1);
    expect(inputLabel.find("Radio").length).toBe(1);
    expect(inputLabel.find("ServiceRefundableTypeDescription").length).toBe(1);
  });
  it("should trigger onSelected on Radio component change", () => {
    const radio = inputLabel.find("Radio");
    radio.simulate("change", { target: { checked: true } });
    expect(mockSelected).toBeCalledWith(props.id);
  });
  it("should pass the right props to the ServiceRefundableTypeDescription component", () => {
    const desc = inputLabel.find("ServiceRefundableTypeDescription");

    expect(desc.prop("cost")).toBe(props.cost);
    expect(desc.prop("duration")).toBe(props.duration);
    expect(desc.prop("bookedDate")).toBeTruthy();
  });
  it("should display FREE if the cost is 0", () => {
    expect(priceIndicator.length).toBe(1);
    expect(priceIndicator.text()).toBe("FREE");
  });
  it("should render a PriceDisplay component if the cost is more than 0", () => {
    wrapper = shallow(<ServiceCancelationPolicyInput {...props} cost={15} />);
    priceIndicator = wrapper.find(getTestId(testids.price));
    expect(priceIndicator.find("PriceDisplay").length).toBe(1);
    expect(priceIndicator.find("PriceDisplay").prop("price")).toBe(15);
  });
});
