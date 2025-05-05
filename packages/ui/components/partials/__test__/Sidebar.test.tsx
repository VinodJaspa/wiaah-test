import React from "react";
import { shallow, mount } from "enzyme";
import { SidebarContext, SidebarProvider } from "../../helpers/SidebarContext";

describe("Sidebar work as expected", () => {
  it("check for last snapshot", () => {
    const wrapper = shallow(<SidebarProvider />);
    expect(wrapper).toMatchSnapshot();
  });
  const context = { visible: true };
  const visible = false;
  it("visible when context visibility is true", () => {
    const wrapper = mount(
      <SidebarContext.Provider
        value={{
          visible: true,
          toggleVisibility: () => {},
        }}
      >
        <SidebarProvider />
      </SidebarContext.Provider>
    );
    expect(wrapper.find("aside.flex").length).toEqual(1);
  });
  it("has the right nasted menu", () => {
    const menu = [
      {
        label: "Clothing",
        url: "",
        children: [
          {
            label: "Women's",
            url: "",
            children: [
              {
                label: "Dresses",
                url: "",
              },
              {
                label: "Shirts",
                url: "",
              },
            ],
          },
          {
            label: "Men's",
            url: "",
          },
        ],
      },
      {
        label: "Home & Living",
        url: "/home-and-living",
      },
    ];
    const wrapper = mount(<SidebarProvider />);
    expect(wrapper.find(".nasted-menu .nasted-menu-children").length).toBe(2);
    expect(
      wrapper.find(".nasted-menu .nasted-menu-children p").first().text(),
    ).toBe("Clothing");
    expect(
      wrapper.find(".nasted-menu .nasted-menu-children p").at(1).text(),
    ).toBe("Home & Living");
    expect(
      wrapper.find(".nasted-menu .nasted-menu-children Link").prop("href"),
    ).toBe("/home-and-living");
    wrapper
      .find(".nasted-menu .nasted-menu-children p")
      .first()
      .simulate("click");
    expect(wrapper.find(".nasted-menu .nasted-menu-children").length).toBe(2);
    expect(
      wrapper.find(".nasted-menu .nasted-menu-children p").first().text(),
    ).toBe("Women's");
    expect(
      wrapper.find(".nasted-menu .nasted-menu-children p").at(1).text(),
    ).toBe("Men's");
    wrapper
      .find(".nasted-menu .nasted-menu-children p")
      .first()
      .simulate("click");
    expect(wrapper.find(".nasted-menu .nasted-menu-children").length).toBe(2);
    expect(
      wrapper.find(".nasted-menu .nasted-menu-children p").first().text(),
    ).toBe("Dresses");
    expect(
      wrapper.find(".nasted-menu .nasted-menu-children p").at(1).text(),
    ).toBe("Shirts");
  });
});
