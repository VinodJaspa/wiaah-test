import React from "react";
import { getTestId, waitFor } from "utils";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@UI/components/partials/Menu";
const selectors = {
  menuButton: "MenuButton",
  menuList: "MenuList",
  menuItem: "MenuItem",
};

describe("Menu functional tests", () => {
  let wrapper: ReactWrapper;
  let menuButton: ReactWrapper;
  let menuList: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Menu>
        <MenuButton>
          <span data-testid={selectors.menuButton}>button</span>
        </MenuButton>
        <MenuList>
          {[...Array(10)].map((_, i) => (
            <MenuItem key={i}>item {i}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
    menuButton = wrapper.find(getTestId(selectors.menuButton));
    menuList = wrapper.find(getTestId(selectors.menuList));
  });

  it("should not mount the menuItems initialy", () => {
    expect(menuList.children().length).toBe(0);
  });
  it("should render the options properly on menu button click", () => {
    menuButton.simulate("click");
    wrapper.update();
    menuList = wrapper.find(getTestId(selectors.menuList));

    expect(menuList.children().length).toBe(10);

    menuList.children().map((child, i) => {
      expect(child.text()).toBe("item " + i);
    });
  });
  it("should close and keep items mounted on item click", async () => {
    menuButton.simulate("click");

    wrapper.update();
    menuList = wrapper.find(getTestId(selectors.menuList));

    menuList.children().at(2).simulate("click");

    await waitFor(() => {
      wrapper.update();
      menuList = wrapper.find(getTestId(selectors.menuList));

      expect(menuList.children().length).toBe(10);
    });
  });
});

describe("Menu functional tests with isLazy prop", () => {
  let wrapper: ReactWrapper;
  let menuButton: ReactWrapper;
  let menuList: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Menu isLazy>
        <MenuButton>
          <span data-testid={selectors.menuButton}>button</span>
        </MenuButton>
        <MenuList>
          {[...Array(10)].map((_, i) => (
            <MenuItem key={i}>item {i}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
    menuButton = wrapper.find(getTestId(selectors.menuButton));
    menuList = wrapper.find(getTestId(selectors.menuList));
  });

  it("should not mount the menuItems initialy", () => {
    expect(menuList.children().length).toBe(0);
  });
  it("should render the options properly on menu button click", () => {
    menuButton.simulate("click");
    wrapper.update();
    menuList = wrapper.find(getTestId(selectors.menuList));

    expect(menuList.children().length).toBe(10);

    menuList.children().map((child, i) => {
      expect(child.text()).toBe("item " + i);
    });
  });
  it("should close and unmount items item click after a while not longer than 200ms", async () => {
    menuButton.simulate("click");

    wrapper.update();
    menuList = wrapper.find(getTestId(selectors.menuList));

    menuList.children().at(2).simulate("click");

    await waitFor(
      () => {
        wrapper.update();
        menuList = wrapper.find(getTestId(selectors.menuList));

        expect(menuList.children().length).toBe(0);
      },
      {
        timeout: 200,
      }
    );
  });
});
