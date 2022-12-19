import { storybookMenusTitle, NotifiactionsMenu, Button } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookMenusTitle + "NotifiactionsMenu",
  component: NotifiactionsMenu,
} as ComponentMeta<typeof NotifiactionsMenu>;

export const Default = () => (
  <NotifiactionsMenu>
    <Button>open</Button>
  </NotifiactionsMenu>
);
