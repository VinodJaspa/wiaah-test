import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout } from "ui/utils";
import { Button } from "../Button";
import { Accordion } from "./";
import { AccordionButton } from "./AccordionButton";
import { AccordionItem } from "./AccordionItem";
import { AccordionPanel } from "./AccordionPanel";

export default {
  title: "UI / partials / Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

// const Template: ComponentStory<typeof Accordion> = ({ ...args }) => {
//   return (
//     <section className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
//       <Accordion {...args}>
//         <AccordionItem itemkey="item 1">
//           <AccordionButton>
//             <Button>test</Button>
//           </AccordionButton>
//           <AccordionPanel>panel</AccordionPanel>
//         </AccordionItem>
//       </Accordion>
//     </section>
//   );
// };

export const unControlled: React.FC = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
    import {
      Accordion,
      AccordionItem,
      AccordionButton,
      AccordionPanel
    } from "ui"


    ...
    return(
      <div className="flex flex-col gap-4">
        <Accordion>
          <AccordionItem itemkey="1">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel className="">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatem cum, harum delectus ipsam vitae amet illum quidem
              ipsum, pariatur eligendi officia est! Corporis iste eveniet
              tenetur suscipit accusantium aperiam eius.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="2">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="3">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    )
    `}
    >
      <div className="flex flex-col gap-4">
        <Accordion>
          <AccordionItem itemkey="1">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel className="">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatem cum, harum delectus ipsam vitae amet illum quidem
              ipsum, pariatur eligendi officia est! Corporis iste eveniet
              tenetur suscipit accusantium aperiam eius.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="2">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="3">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </StorybookImplemntationLayout>
  );
};

export const Controlled: React.FC = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
    import {
      Accordion,
      AccordionItem,
      AccordionButton,
      AccordionPanel
    } from "ui"


    ...
    return(
      <div className="flex flex-col gap-4">
        <Accordion>
          <AccordionItem itemkey="1">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel className="">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatem cum, harum delectus ipsam vitae amet illum quidem
              ipsum, pariatur eligendi officia est! Corporis iste eveniet
              tenetur suscipit accusantium aperiam eius.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="2">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="3">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    )
    `}
    >
      <div className="flex flex-col gap-4">
        <Accordion controled>
          <AccordionItem itemkey="1">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel className="">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatem cum, harum delectus ipsam vitae amet illum quidem
              ipsum, pariatur eligendi officia est! Corporis iste eveniet
              tenetur suscipit accusantium aperiam eius.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="2">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey="3">
            <AccordionButton>open</AccordionButton>
            <AccordionPanel>panel</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </StorybookImplemntationLayout>
  );
};
