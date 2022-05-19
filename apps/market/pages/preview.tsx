import React from "react";
import { NextPage } from "next";
import { Select, SelectOption } from "ui";

const preview: NextPage = () => {
  return (
    <section className="w-full overflow-scroll h-screen">
      <div className="w-1/2 h-full m-auto">
        <Select onOptionSelect={(value) => console.log(value)}>
          <SelectOption value="1">test 1</SelectOption>
          <SelectOption value="2">test 2</SelectOption>
          <SelectOption value="3">test 3</SelectOption>
          <SelectOption value="4">test 4</SelectOption>
          <SelectOption value="5">test 5</SelectOption>
        </Select>
      </div>
    </section>
  );
};

export default preview;
