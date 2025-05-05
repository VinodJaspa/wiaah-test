import { Meta } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout, storybookPartailsTitle } from "utils";
import { AccordionButton, AccordionItem, AccordionPanel, Accordion } from "@UI";

export default {
  title: "UI / partials / Accordion",
  component: Accordion,
} as Meta<typeof Accordion>;

export const unControlled: React.FC = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
    import {
      Accordion,
      AccordionItem,
      AccordionButton,
      AccordionPanel
    } from "@UI"


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
    } from "@UI"


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
