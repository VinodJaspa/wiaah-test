import { storybookBlocksTitle, AuthSwitcher } from "@UI";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "AuthSwitcher",
  component: AuthSwitcher,
} as ComponentMeta<typeof AuthSwitcher>;

const Template: ComponentStory<typeof AuthSwitcher> = ({ ...args }) => {
  return <AuthSwitcher {...args} />;
};

export const buyerSignup = Template.bind({});
buyerSignup.args = {
  loginType: "buyer-signup",
};
export const login = Template.bind({});
login.args = {
  loginType: "login",
};

export const sellerSignup = Template.bind({});
sellerSignup.args = {
  loginType: "seller-signup",
};
