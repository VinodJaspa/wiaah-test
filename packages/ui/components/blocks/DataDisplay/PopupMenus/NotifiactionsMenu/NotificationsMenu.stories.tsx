import { storybookMenusTitle, NotifiactionsMenu, Button } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / menus /NotifiactionsMenu",
  component: NotifiactionsMenu,
} as Meta<typeof NotifiactionsMenu>;

export const Default = () => (
  <NotifiactionsMenu>
    <Button>open</Button>
  </NotifiactionsMenu>
);
