import React from "react";
import { SellerNavigationSideBar } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import {
  HiNewspaper,
  HiOutlineNewspaper,
  HiPaperClip,
  HiOutlinePaperClip,
  HiSearch,
  HiOutlineSearch,
} from "react-icons/hi";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
export default {
  title: "UI/blocks/SideBars/SellerNavigationSideBar",
  component: SellerNavigationSideBar,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SellerNavigationSideBar>;

const Templete: ComponentStory<typeof SellerNavigationSideBar> = ({
  activeLink,
  ...args
}) => {
  const [active, setActive] = React.useState<number>(0);
  return (
    <SellerNavigationSideBar
      activeLink={active}
      onItemClick={(_, i) => setActive(i)}
      {...args}
    />
  );
};

export const Default = Templete.bind({});
Default.args = {
  links: [
    {
      name: "newsfeed",
      icon: HiOutlineNewspaper,
      activeIcon: HiNewspaper,
    },
    {
      name: "discover",
      icon: HiOutlineSearch,
      activeIcon: HiSearch,
    },
    {
      name: "shop",
      icon: AiOutlineShop,
      activeIcon: AiFillShop,
    },
    {
      name: "affiliation",
      icon: HiOutlinePaperClip,
      activeIcon: HiPaperClip,
    },
  ],
};
