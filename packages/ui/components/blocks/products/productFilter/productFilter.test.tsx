import React from "react";
import { shallow, mount } from "enzyme";
import { ProductFilter } from "../products/productFilter";
import { FaFirstAid } from "react-icons/fa";

it("renders as expected without parameters", () => {
  const wrapper = shallow(<ProductFilter />);
  expect(wrapper.find("input").first().prop("min")).toEqual(0);
  expect(wrapper.find("input").first().prop("max")).toEqual(1000);
  expect(wrapper.find("input").at(1).prop("min")).toEqual(0);
  expect(wrapper.find("input").at(1).prop("max")).toEqual(1000);
  expect(wrapper.find(".shipping-selector").length).toEqual(1);
  expect(wrapper.find(".brand-selector").length).toEqual(0);
  expect(wrapper.find(".color-selector").length).toEqual(0);
  expect(wrapper.find(".country-selector").length).toEqual(1);
  expect(wrapper.find(".city-selector").length).toEqual(1);
  expect(wrapper).toMatchSnapshot();
});

it("render as expeted with all parameters", async () => {
  const wrapper = shallow(
    <ProductFilter
      priceRange={{ min: 1000, max: 2000 }}
      shipping={[
        { label: "Click and Collect", value: "click_and_collect" },
        { label: "New Method", value: "new_method" },
      ]}
      brands={[
        { label: "First Brand", value: "first_brand" },
        { label: "Seconde Brand", value: "seconde_brand" },
      ]}
    />
  );
  expect(wrapper.find(".min-price").first().text()).toEqual("$1000");
  expect(wrapper.find(".max-price").first().text()).toEqual("$2000");
  expect(wrapper.find(".shipping-selector input").length).toEqual(2);
  expect(wrapper.find(".brand-selector input").length).toEqual(2);

  wrapper
    .find("input")
    .first()
    .simulate("change", {
      target: { value: 500 },
    });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value: 900 },
    });
  expect(wrapper.find("input").first().props().value).toEqual(500);
  expect(wrapper.find("input").at(1).props().value).toEqual(900);
  const accordionToggle = wrapper.find(".accordion-toggle");
  accordionToggle.forEach((item) => {
    item.simulate("click");
  });
  setTimeout(() => {
    accordionToggle.forEach((item) => {
      expect(item.find("rotate-180").length).toEqual(1);
    });
  }, 1000);
});
describe("country an city selector works", () => {
  function asUS(country: any) {
    return country.isoCode === "us";
  }
  it("country an city selector works", () => {
    const wrapper = shallow(<ProductFilter />);
    expect(wrapper.find("#countryselect").prop("options")).toBeDefined();
    expect(
      JSON.stringify(wrapper.find("#cityselect").prop("options"))
    ).toContain("Select country first!");
    // wrapper.find('#countryselect').simulate('onChange',{
    //     target:{value:'BJ'}
    // });
    //expect(wrapper.find('.brand-selector input').length).toEqual(2);
  });
});
