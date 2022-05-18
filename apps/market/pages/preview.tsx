import React from "react";
import { NextPage } from "next";
import { Button, Menu, MenuButton, MenuList, MenuItem, DateInput } from "ui";

const preview: NextPage = () => {
  return (
    <section className="w-full overflow-scroll h-screen">
      <div className="w-1/2 h-full m-auto">
        <Menu>
          <MenuButton>
            <Button>open</Button>
          </MenuButton>
          <MenuList>
            <DateInput />
          </MenuList>
        </Menu>
      </div>
    </section>
  );
};

export default preview;
