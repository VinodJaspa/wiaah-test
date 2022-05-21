import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Button } from "../Button";
import { Accordion } from "./";
import { AccordionButton } from "./AccordionButton";
import { AccordionItem } from "./AccordionItem";
import { AccordionPanel } from "./AccordionPanel";

export default {
  title: "UI / partials / Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = ({ ...args }) => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
      <Accordion {...args}>
        <AccordionItem key="item 1">
          <AccordionButton>
            <Button>test</Button>
          </AccordionButton>
          <AccordionPanel>panel</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export const Default = Template.bind({});
Default.args = {};
