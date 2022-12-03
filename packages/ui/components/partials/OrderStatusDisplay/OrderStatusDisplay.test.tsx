import React from "react";
import { shallow } from "enzyme";
import { OrderStatusDisplay } from "./index";

describe("OrderStatusDisplay functional tests", () => {
  it("should have the text 'completed' when passing 'completed' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="completed" />);
    expect(wrapper.text()).toBe("completed");
  });
  it("should have the text 'canceled' when passing 'canceled' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="canceled" />);
    expect(wrapper.text()).toBe("canceled");
  });
  it("should have the text 'continuing' when passing 'continuing' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="continuing" />);
    expect(wrapper.text()).toBe("continuing");
  });
  it("should have the text 'restitue' when passing 'restitue' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="restitue" />);
    expect(wrapper.text()).toBe("restitue");
  });
});

describe("OrderStatusDisplay snapshot tests", () => {
  it("should matc snapshot when passing 'completed' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="completed" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot when passing 'canceled' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="canceled" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot when passing 'continuing' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="continuing" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot when passing 'restitue' to the status prop", () => {
    const wrapper = shallow(<OrderStatusDisplay status="restitue" />);
    expect(wrapper).toMatchSnapshot();
  });
});
