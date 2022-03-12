import React from "react";
import { shallow, mount } from "enzyme";
import { Header } from "../../blocks";
import { SidebarContext } from "../../helpers/SidebarContext";

describe("Header component render as expected", () => {
  it("check for last snapshot", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
it("show sidebar when context visibility is true", () => {
  const wrapper = mount(<Header />, {
    wrappingComponent: SidebarContext.Provider,
    wrappingComponentProps: {
      value: {
        visible: true,
        toggleVisibility: () => {},
      },
    },
  });
  wrapper.find("#burger-menu-toggle").simulate("click");
  expect(wrapper.find("Sidebar aside.flex").length).toEqual(1);
});
