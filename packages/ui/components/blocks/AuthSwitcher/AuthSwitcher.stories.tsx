
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { AuthSwitcher } from ".";

export default {
  title: "UI / blocks / AuthSwitcher",
  component: AuthSwitcher,

  parameters: {
    nextjs: {
      router: {
        basePath: '/profile',
      },
    }
  
  },
} as Meta<typeof AuthSwitcher>;

const Template: StoryFn<typeof AuthSwitcher> = ({ ...args }) => {
  return <AuthSwitcher {...args} />;
};

export const buyerSignup = {
  render: Template,

  args: {
    loginType: "buyer-signup",
  },
};

export const login = {
  render: Template,

  args: {
    loginType: "login",
  },
};

export const sellerSignup = {
  render: Template,

  args: {
    loginType: "seller-signup",
  },
};
