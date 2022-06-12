import { storybookLayoutTitle } from "utils";
import { SectionsLayout } from "ui";
import { ComponentMeta } from "@storybook/react";
import React from "react";
export default {
  title: storybookLayoutTitle + "SectionLayout",
  component: SectionsLayout,
} as ComponentMeta<typeof SectionsLayout>;

export const Default = () => {
  const [section, setSection] = React.useState<string>("");
  return (
    <SectionsLayout
      currentSectionName={section}
      name="test section"
      handleSectionChange={(sectionName) => setSection(sectionName)}
      sections={[
        {
          panelComponent: <div>section 1</div>,
          panelIcon: () => <span>icon 1</span>,
          panelName: "panel 1",
          panelUrl: "/panel 1",
        },
        {
          panelComponent: <div>section 2</div>,
          panelIcon: () => <span>icon 2</span>,
          panelName: "panel 2",
          panelUrl: "/panel 2",
        },
        {
          panelComponent: <div>section 3</div>,
          panelIcon: () => <span>icon 3</span>,
          panelName: "panel 3",
          panelUrl: "/panel 3",
        },
      ]}
    />
  );
};
