import { ComponentMeta } from "@storybook/react";
import React from "react";
import { Rate, RateProps } from "./";
import { StorybookImplemntationLayout } from "ui/utils";

export default {
  title: "UI / partials / Rate",
  component: Rate,
} as ComponentMeta<typeof Rate>;

export const Default: React.FC<RateProps> = (props) => {
  return (
    <>
      <StorybookImplemntationLayout
        implmentation={`
      import {Rate} from "ui"
      
      
      <Rate rating={4} />
      `}
      >
        <Rate rating={4} />
      </StorybookImplemntationLayout>
    </>
  );
};
export const WithOutOf: React.FC<RateProps> = (props) => {
  return (
    <>
      <StorybookImplemntationLayout
        implmentation={`
      import {Rate} from "ui"
      
      
      <Rate rating={4} outOf={10} />
      `}
      >
        <Rate rating={4} outOf={10} />
      </StorybookImplemntationLayout>
    </>
  );
};
export const WithHalf: React.FC<RateProps> = (props) => {
  return (
    <>
      <StorybookImplemntationLayout
        implmentation={`
import {Rate} from "ui"


<Rate allowHalf rating={7.7} outOf={10} />
      `}
      >
        <Rate allowHalf rating={7.7} outOf={10} />
      </StorybookImplemntationLayout>
    </>
  );
};
