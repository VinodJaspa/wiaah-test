import { ComponentMeta } from "@storybook/react";
import { MessageSettingsDrawer } from "../drawers";
import { storybookDrawersTitle } from "utils";
import { Button } from "@partials";
import { useSocialControls } from "@blocks";
import { RecoilRoot } from "recoil";

export default {
  title: storybookDrawersTitle + "MessageSettingsDrawer",
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} as ComponentMeta<typeof MessageSettingsDrawer>;

export const Default = () => {
  const { showMessageSettings } = useSocialControls();
  return (
    <>
      <Button onClick={showMessageSettings}>show</Button>
      <MessageSettingsDrawer />
    </>
  );
};
