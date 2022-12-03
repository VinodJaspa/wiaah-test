import React from "react";
import { SellerNavigationSideBar } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import {
  HomeIcon,
  AffiliationIcon,
  DiscoverIcon,
  ShoppingCartIcon,
  ServicesIcon,
} from "ui";
import { CgPlayButtonR } from "react-icons/cg";
export default {
  title: "UI/blocks/SideBars/SellerNavigationSideBar",
  component: SellerNavigationSideBar,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SellerNavigationSideBar>;

const Templete: ComponentStory<typeof SellerNavigationSideBar> = ({
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

export const Default = Templete.bind({});
Default.args = {
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
};
