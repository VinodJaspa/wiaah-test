import { ComponentMeta } from "@storybook/react";
import { Menu, MenuButton, MenuList, MenuItem, MenuProps } from "ui";
import {
  storybookPartailsTitle,
  StorybookImplemntationLayout,
  Counter,
} from "ui/utils";
import React from "react";

export default {
  title: storybookPartailsTitle + "Menu",
  component: Menu,
} as ComponentMeta<typeof Menu>;

export const Default: React.FC<MenuProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Menu, MenuButton, MenuList, MenuItem } from "ui"

...
return (
    <Menu>
        <MenuButton>
          <button>open menu</button>
        </MenuButton>
        <MenuList>
          <MenuItem>item 1</MenuItem>
          <MenuItem>item 2</MenuItem>
          <MenuItem>item 3</MenuItem>
          <MenuItem>item 4</MenuItem>
        </MenuList>
    </Menu>
)

        `}
    >
      <Menu>
        <MenuButton>
          <button>open menu</button>
        </MenuButton>
        <MenuList>
          <MenuItem className="whitespace-nowrap">item 1</MenuItem>
          <MenuItem className="whitespace-nowrap">item 2</MenuItem>
          <MenuItem className="whitespace-nowrap">item 3</MenuItem>
          <MenuItem className="whitespace-nowrap">item 4</MenuItem>
        </MenuList>
      </Menu>
    </StorybookImplemntationLayout>
  );
};

export const WithNoLazy: React.FC<MenuProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Menu, MenuButton, MenuList, MenuItem } from "ui"

...
return (
    <Menu>
        <MenuButton>
          <button>open menu</button>
        </MenuButton>
        <MenuList>
          <Counter />
        </MenuList>
    </Menu>
)

        `}
    >
      <Menu>
        <MenuButton>
          <button>open menu</button>
        </MenuButton>
        <MenuList>
          <Counter />
        </MenuList>
      </Menu>
    </StorybookImplemntationLayout>
  );
};

export const WithLazy: React.FC<MenuProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Menu, MenuButton, MenuList, MenuItem } from "ui"

...
return (
    <Menu isLazy>
        <MenuButton>
          <button>open menu</button>
        </MenuButton>
        <MenuList>
          <Counter />
        </MenuList>
    </Menu>
)

        `}
    >
      <Menu isLazy>
        <MenuButton>
          <button>open menu</button>
        </MenuButton>
        <MenuList>
          <Counter />
        </MenuList>
      </Menu>
    </StorybookImplemntationLayout>
  );
};
