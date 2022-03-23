import { mount, shallow } from "enzyme";
import { DropdownPanel } from "../DropdownPanel";
import React from "react";
describe("DropdownPanel Component", () => {
  it("should render properly", () => {
    shallow(<DropdownPanel name="test" />);
  });
  it("should render its name on the head properly", () => {
    const component = shallow(<DropdownPanel name="test name" />);
    const name = component.find("[data-test='DropdownName']");

    expect(name.text()).toBe("test name");
  });
  it("should contain the right elements", () => {
    const component = shallow(<DropdownPanel name="test" />);
    const name = component.find("[data-test='DropdownName']");
    const Symbol = component.find("[data-test='DropdownSymbol']");
    const childsContainer = component.find(
      "[data-test='DropdownChildsContainer']"
    );

    expect(name.length).toBe(1);
    expect(Symbol.length).toBe(1);
    expect(childsContainer.length).toBe(1);
  });
  it("should render childrens properly", () => {
    const component = shallow(
      <DropdownPanel name="test">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </DropdownPanel>
    );
    const childsContainer = component.find(
      "[data-test='DropdownChildsContainer']"
    );
    const childrens = childsContainer.children();
    expect(childrens.length).toBe(4);
  });
  it("should have closed state without 'open' prop", () => {
    const component = shallow(<DropdownPanel name="test" />);
    const openSymbol = component.find("[data-test='DropdownSymbol']");

    expect(openSymbol.text()).toBe("+");
  });
  it("should have open state with 'open' prop set to true", () => {
    const component = shallow(<DropdownPanel name="test" open={true} />);
    const openSymbol = component.find("[data-test='DropdownSymbol']");

    expect(openSymbol.text()).toBe("-");
  });
  it("should alternate between open state on open and close", () => {
    const component = shallow(<DropdownPanel name="test" />);
    const header = component.find("[data-test='DropdownPanelHead']");
    let openSymbol = component.find("[data-test='DropdownSymbol']");

    expect(openSymbol.text()).toBe("+");
    header.simulate("click");
    openSymbol = component.find("[data-test='DropdownSymbol']");
    expect(openSymbol.text()).toBe("-");
    header.simulate("click");
    openSymbol = component.find("[data-test='DropdownSymbol']");
    expect(openSymbol.text()).toBe("+");
  });
});

describe("DropdownPanel snapshot", () => {
  it("should match snapshot", () => {
    const component = shallow(<DropdownPanel name="test" />);
    expect(component).toMatchSnapshot();
  });
  it("should match snapshot with childs", () => {
    const component = mount(
      <DropdownPanel name="test">
        <div>child 1</div>
        <div>child 2 </div>
        <div>
          child with nested childs <span>span</span>
        </div>
      </DropdownPanel>
    );
    expect(component).toMatchSnapshot();
  });
});
