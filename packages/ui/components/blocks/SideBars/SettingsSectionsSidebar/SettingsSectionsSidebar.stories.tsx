import { SettingsSectionsSidebar } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSidebarsTitle } from "utils";
import React from "react";

export default {
  title: storybookSidebarsTitle + "SettingsSectionsSidebar",
  component: SettingsSectionsSidebar,
} as ComponentMeta<typeof SettingsSectionsSidebar>;

const template: ComponentStory<typeof SettingsSectionsSidebar> = (args) => {
  const [panel, setPanel] = React.useState<string>();
  return (
    <SettingsSectionsSidebar
      {...args}
      currentActive={panel}
      onPanelClick={(v) => setPanel(v)}
    />
  );
};

export const Default = template.bind({});
Default.args = {
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
};
