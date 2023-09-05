import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SubscribersPopup } from "@UI";
import { Button } from "@chakra-ui/react";
import { t } from "i18next";
export default {
  title: "UI/blocks/Social/SubscribersPopup",
  component: SubscribersPopup,
} as ComponentMeta<typeof SubscribersPopup>;

const Template: ComponentStory<typeof SubscribersPopup> = ({
  isOpen,
  onClose,
  ...args
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{t("open", "open")}</Button>
      <SubscribersPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        {...args}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "subscribers",
};
