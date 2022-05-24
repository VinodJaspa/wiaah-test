import { ComponentMeta } from "@storybook/react";
import React from "react";
import { Select, SelectOption } from "./";

export default {
  title: "UI / partials / Select",
  component: Select,
} as ComponentMeta<typeof Select>;

export const Default = ({ ...args }) => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
      <div className="flex flex-col w-full justify-between px-4">
        <div className="vstack">
          <span className="font-bold text-xl">implementaion</span>
          <pre>
            {`
        import {Select,SelectOption} from "ui"

        
        <Select onOptionSelect={(value)=> {}}>
          <SelectOption value={"1"}>  option  </SelectOption>
          <SelectOption value={"2"}>  option  </SelectOption>
          <SelectOption value={"3"}>  option  </SelectOption>
          <SelectOption value={"4"}>  option  </SelectOption>
        </Select>
        `}
          </pre>
        </div>
        <Select onOptionSelect={(value) => {}} {...args}>
          <SelectOption value={""}>option</SelectOption>
          <SelectOption value={""}>option</SelectOption>
          <SelectOption value={""}>option</SelectOption>
          <SelectOption value={""}>option</SelectOption>
        </Select>
      </div>
    </section>
  );
};

export const WithPlaceholder = ({ ...args }) => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
      <div className="flex flex-col w-full justify-between px-4">
        <div className="vstack">
          <span className="font-bold text-xl">implementaion</span>
          <pre>
            {`
        import {Select,SelectOption} from "ui"

        
        <Select placeholder={"test placeholder"} onOptionSelect={(value)=> {}}>
          <SelectOption value={"1"}>  option  </SelectOption>
          <SelectOption value={"2"}>  option  </SelectOption>
          <SelectOption value={"3"}>  option  </SelectOption>
          <SelectOption value={"4"}>  option  </SelectOption>
        </Select>
        `}
          </pre>
        </div>
        <Select
          placeholder="test placeholder"
          onOptionSelect={(value) => {}}
          {...args}
        >
          <SelectOption value={""}>option</SelectOption>
          <SelectOption value={""}>option</SelectOption>
          <SelectOption value={""}>option</SelectOption>
          <SelectOption value={""}>option</SelectOption>
        </Select>
      </div>
    </section>
  );
};
