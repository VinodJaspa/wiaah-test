import React from "react";
import { NavigationLinkType } from "types";
import { getRoleId } from "utils/src/test/test-utils";
import { SellerNavigationSideBar } from ".";
import {
  HiUserGroup,
  HiOutlineUserGroup,
  HiHome,
  HiOutlineHome,
} from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";
import { CgPlayButtonR } from "react-icons/cg";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import { AffiliationIcon, AffiliationIconOutline } from "@UI";
import { fireEvent, render, RenderResult } from "@testing-library/react";

const selectors = {
  link: "NavigationSideBarLink",
  linkLabel: "NavigationSideBarLinkLabel",
  childContainer: "NavigationSideBarChildContainer",
  headerElementContainer: "NavigationSideBarHeaderContainer",
};

const ChildMock: React.FC = () => {
  return <div>child</div>;
};
const HeaderMock: React.FC = () => {
  return <div>header</div>;
};
const linksPlaceHolder: NavigationLinkType[] = [
  {
    name: "homepage",
    icon: <HiOutlineHome />,
    activeIcon: <HiHome />,
    url: "/",
  },
  {
    name: "discover",
    icon: <HiOutlineUserGroup />,
    activeIcon: <HiUserGroup />,
    url: "/discover",
  },
  {
    name: "action",
    icon: <CgPlayButtonR />,
    activeIcon: <IoVideocam />,
    url: "/action",
  },
  {
    name: "shop",
    icon: <AiOutlineShop />,
    activeIcon: <AiFillShop />,
    url: "/shop",
  },
  {
    name: "affiliation",
    icon: <AffiliationIconOutline />,
    activeIcon: <AffiliationIcon />,
    url: "/affiliation",
  },
];

describe("SellerNavigationSideBar tests", () => {
  let wrapper: RenderResult;
  let childMock: RenderResult;
  let headerMock: RenderResult;
  let links: HTMLElement[];
  let childContainer: HTMLElement;
  let headerContainer: HTMLElement;
  let onLinkClickMock: jest.Mock;

  beforeEach(() => {
    onLinkClickMock = jest.fn();
    wrapper = render(
      <SellerNavigationSideBar
        onLinkClick={onLinkClickMock}
        headerElement={<HeaderMock />}
      >
        <ChildMock />
      </SellerNavigationSideBar>,
    );

    childMock = render(<ChildMock />);
    headerMock = render(<HeaderMock />);

    links = wrapper.queryAllByRole(selectors.link);
    childContainer = wrapper.getByRole(selectors.childContainer);
    headerContainer = wrapper.getByRole(selectors.headerElementContainer);
  });

  it("should render the right amount of links", () => {
    expect(links.length).toBe(linksPlaceHolder.length);
  });
  it("should have the right label for links", () => {
    links.map((link, i) => {
      const label = link.querySelector(getRoleId(selectors.linkLabel));
      expect(label?.textContent).toBe(linksPlaceHolder[i].name);
    });
  });

  it("should call onLinkClick callback with the right link name", () => {
    links.map((link, i) => {
      fireEvent.click(link);
      expect(onLinkClickMock).toHaveBeenCalledTimes(i + 1);
      expect(onLinkClickMock).toHaveBeenCalledWith(linksPlaceHolder[i], i);
    });
  });

  it("should render child comonent propery", () => {
    expect(childContainer.innerHTML).toBe(`<div>child</div>`);
  });

  it("should render header component properly", () => {
    expect(headerContainer.innerHTML).toBe(`<div>header</div>`);
  });
});

describe("SellerNavigationSideBar snapshot tests", () => {
  it("should match snapshot", () => {
    expect(
      render(
        <SellerNavigationSideBar>
          <ChildMock />
        </SellerNavigationSideBar>,
      ),
    ).toMatchSnapshot();
  });
});
