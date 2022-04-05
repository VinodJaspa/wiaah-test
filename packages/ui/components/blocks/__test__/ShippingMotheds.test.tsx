import { mount, ReactWrapper, render, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { ShippingMotheds } from "../ShippingMotheds";
import { shippingMotheds } from "ui/placeholder";
import { getMountedComponent } from "../../helpers";
import { act } from "react-dom/test-utils";

const selectors = {
  shippingMothedTitle: "#ShippingMothedTitle",
  mothedsContainer: "#ShippingMothedsContainer",
  mothed: "[data-testId='ShippingMothed']",
  mothedInput: "[data-testId='ShippingMothedInput']",
  mothedCost: "[data-testId='ShippingMothedCost']",
  mothedName: "[data-testId='ShippingMothedName']",
  mothedDescription: "[data-testId='ShippingMothedDescription']",
};

describe("ShippingMotheds component render tests", () => {
  let wrapper: ShallowWrapper;
  let wrapperWithData: ShallowWrapper;
  let shippingMothedTitle: ShallowWrapper;
  let mothedsContainer: ShallowWrapper;
  let wrapperMotheds: ShallowWrapper;
  let wrapperWithDataMotheds: ShallowWrapper;
  let mothedsContainerWithData: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<ShippingMotheds motheds={[]} />);
    wrapperWithData = shallow(<ShippingMotheds motheds={shippingMotheds} />);
    shippingMothedTitle = wrapper.find(selectors.shippingMothedTitle);
    mothedsContainer = wrapper.find(selectors.mothedsContainer);
    mothedsContainerWithData = wrapperWithData.find(selectors.mothedsContainer);
    wrapperMotheds = wrapper.find(selectors.mothed);
    wrapperWithDataMotheds = wrapper.find(selectors.mothed);
  });
  afterEach(() => {
    wrapper.unmount();
    wrapperWithData.unmount();
  });

  it("should render properly with an empty motheds array", () => {
    shallow(<ShippingMotheds motheds={[]} />);
  });
  it("should render properly", () => {
    shallow(<ShippingMotheds motheds={shippingMotheds} />);
  });
  it("should have choices container element", () => {
    expect(mothedsContainer.length).toBe(1);
  });
  it("should contain the right choices as passed", () => {
    shippingMotheds.forEach((mothed) => {
      const mothedComp = mothedsContainerWithData.find(
        `[data-testMothedId='${mothed.id}']`
      );
      expect(mothedComp.length).toBe(1);
      const cost = mothed.cost > 0 ? `$${mothed.cost}` : "FREE";
      expect(mothedComp.find(selectors.mothedCost).text()).toBe(cost);
      expect(mothedComp.find(selectors.mothedName).text()).toBe(mothed.name);
      if (mothed.description) {
        expect(mothedComp.find(selectors.mothedDescription).text()).toBe(
          mothed.description
        );
      }
    });
  });
  it("should contain 0 choices when passing an empty array", () => {
    expect(mothedsContainer.children().length).toBe(0);
  });
  it("should not have any choice selected initially", () => {
    const choices = wrapperWithData.find(selectors.mothed);
    expect(choices.length).toBeGreaterThan(0);
    choices.forEach((choice) => {
      const input = choice.find(selectors.mothedInput);
      expect(input.props().checked).toBe(false);
    });
  });
});

describe("ShippingMotheds component functionallty tests", () => {
  let wrapperWithData: ReactWrapper;
  let wrapperMotheds: ReactWrapper;
  let wrapperWithDataMotheds: ReactWrapper;
  let mothedsContainer: ReactWrapper;

  beforeEach(() => {
    wrapperWithData = mount(<ShippingMotheds motheds={shippingMotheds} />);
    wrapperMotheds = wrapperWithData.find(selectors.mothed);
    mothedsContainer = wrapperWithData.find(selectors.mothedsContainer);
  });

  afterEach(() => {
    wrapperWithData.unmount();
  });

  it("should select the mothed on click", () => {
    expect(wrapperMotheds.length).toBeGreaterThan(0);
    wrapperMotheds.forEach((mothed, i) => {
      act(() => {
        mothed.simulate("click");
      });
      mothed.update();
      wrapperWithData.update();
      const updatedMotheds = wrapperWithData.find(selectors.mothed);
      const inputs = updatedMotheds.map((mothed) =>
        getMountedComponent(mothed, selectors.mothedInput, 2)
      );
      const input = inputs[i];
      expect(input.prop("checked")).toBe(true);
      const filtered = inputs.filter(
        (input) => input.prop("checked") === false
      );
      expect(filtered.length).toBe(wrapperMotheds.length - 1);
    });
  });
});

describe("ShippingMotheds component snapshot tests", () => {
  it("should match snapshot with empty motheds", () => {
    expect(shallow(<ShippingMotheds motheds={[]} />)).toMatchSnapshot();
  });
  it("should match snapshot with the placeholder motheds", () => {
    expect(
      shallow(<ShippingMotheds motheds={shippingMotheds} />)
    ).toMatchSnapshot();
  });
});
