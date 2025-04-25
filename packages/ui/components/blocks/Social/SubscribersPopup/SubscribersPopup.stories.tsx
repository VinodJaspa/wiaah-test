import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ShadCnButton, SubscribersPopup } from "@UI";

import { t } from "i18next";
export default {
  title: "UI/blocks/Social/SubscribersPopup",
  component: SubscribersPopup,
} as Meta<typeof SubscribersPopup>;

const Template: StoryFn<typeof SubscribersPopup> = ({
  isOpen,
  onClose,
  ...args
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div>
      <ShadCnButton onClick={() => setOpen(true)}>Open</ShadCnButton>
      <SubscribersPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        {...args}
      />
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    title: "subscribers",
  },
};
