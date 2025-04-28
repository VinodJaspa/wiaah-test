import { Meta } from "@storybook/react";
import React from "react";
import { Rate, RateProps } from "./";
import { StorybookImplemntationLayout } from "utils";

export default {
  title: "UI / partials / Rate",
  component: Rate,
} as Meta<typeof Rate>;

export const Default: React.FC<RateProps> = {
    // @ts-ignore
  render: (props) => {
    return (
      <>
        <StorybookImplemntationLayout
          implmentation={`
        import {Rate} from "@UI"
        
        
        <Rate rating={4} />
        `}
        >
          <Rate rating={4} />
        </StorybookImplemntationLayout>
      </>
    );
  },
};
export const WithOutOf: React.FC<RateProps> = {
  // @ts-ignore
  render: (props) => {
    return (
      <>
        <StorybookImplemntationLayout
          implmentation={`
        import {Rate} from "@UI"
        
        
        <Rate rating={4} outOf={10} />
        `}
        >
          <Rate rating={4} outOf={10} />
        </StorybookImplemntationLayout>
      </>
    );
  },
};
export const WithHalf: React.FC<RateProps> = {
    // @ts-ignore
  render: (props) => {
    return (
      <>
        <StorybookImplemntationLayout
          implmentation={`
  import {Rate} from "@UI"


  <Rate allowHalf rating={7.7} outOf={10} />
        `}
        >
          <Rate allowHalf rating={7.7} outOf={10} />
        </StorybookImplemntationLayout>
      </>
    );
  },
};
