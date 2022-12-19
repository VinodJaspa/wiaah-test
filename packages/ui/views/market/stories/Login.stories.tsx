import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Login } from "@UI/views";
import ChakaraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/View/Market/Login",
  component: Login,
  decorators: [ChakaraUiDecorator],
  argTypes: {
    loginType: {
      name: "loginType",
      description: "login/signup",
      defaultValue: "login",
      type: {
        name: "enum",
        required: true,
        value: ["login", "buyer-signup", "seller-signup"],
      },
    },
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
  loginType: "login",
};
