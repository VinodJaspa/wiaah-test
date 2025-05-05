import React from "react";
import { SellerNavigationSideBar } from ".";
import { Meta, StoryFn } from "@storybook/react";
import {
  HomeIcon,
  AffiliationIcon,
  DiscoverIcon,
  ShoppingCartIcon,
  ServicesIcon,
} from "@UI";
import { CgPlayButtonR } from "react-icons/cg";
export default {
  title: "UI/blocks/SideBars/SellerNavigationSideBar",
  component: SellerNavigationSideBar,
} as Meta<typeof SellerNavigationSideBar>;

const Templete: StoryFn<typeof SellerNavigationSideBar> = ({
  activeLink,
  ...args
}) => {
  const [active, setActive] = React.useState<string>("discover");
  return (
    <SellerNavigationSideBar
      activeLink={active}
      onLinkClick={(link) => setActive(link.url)}
      {...args}
    />
  );
};

export const Default = {
  render: Templete,

  args: {
    links: [
      {
        name: "Home",
        icon: HomeIcon,
        url: "",
      },
      {
        name: "discover",
        icon: DiscoverIcon,
        url: "discover",
      },
      {
        name: "action",
        icon: CgPlayButtonR,
        url: "action",
      },
      {
        name: "shop",
        icon: ShoppingCartIcon,
        url: "shop",
      },
      {
        name: "service",
        icon: ServicesIcon,
        url: "services",
      },
      {
        name: "affiliation",
        icon: AffiliationIcon,
        url: "affiliation",
      },
    ],
  },
};
