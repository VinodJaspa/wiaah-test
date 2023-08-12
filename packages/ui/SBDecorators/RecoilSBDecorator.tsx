import React from "react";
import { RecoilRoot } from "recoil";

export const RecoilStorybookDecorator = (Story: any) => {
  return (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  );
};
