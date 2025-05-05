import { SettingsSectionsSidebar } from "./index";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSidebarsTitle } from "utils";
import React from "react";

export default {
  title: "UI / Blocks / SideBars /SettingsSectionsSidebar",
  component: SettingsSectionsSidebar,
} as Meta<typeof SettingsSectionsSidebar>;

const template: StoryFn<typeof SettingsSectionsSidebar> = (args) => {
  const [panel, setPanel] = React.useState<string>();
  return (
    <SettingsSectionsSidebar
      {...args}
      currentActive={panel}
      onPanelClick={(v) => setPanel(v)}
    />
  );
};

export const Default = {
  render: template,

  args: {
    panelsInfo: [
      {
        panelName: "panel 1",
        panelIcon: "1",
        panelUrl: "/panel1",
        subSections: [],
      },
      {
        panelName: "panel 2",
        panelIcon: "2",
        panelUrl: "/panel2",
        subSections: [],
      },
      {
        panelName: "panel 3",
        panelIcon: "3",
        panelUrl: "/panel3",
        subSections: [],
      },
    ],
  },
};
