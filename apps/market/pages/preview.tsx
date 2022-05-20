import React from "react";
import { NextPage } from "next";
import {
  Select,
  SelectOption,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "ui";

const preview: NextPage = () => {
  return (
    <section className="w-full overflow-scroll h-screen">
      <div className="w-1/2 h-full m-auto flex justify-between"></div>
    </section>
  );
};

export default preview;
