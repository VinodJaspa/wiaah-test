import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SellerServiceWorkingHoursSection } from "./SellerServiceWorkingHoursSection";
import { storybookOtherServicesSectionsTitle } from "utils";

export default {
  title:
    storybookOtherServicesSectionsTitle + "SellerServiceWorkingHoursSetion",
  component: SellerServiceWorkingHoursSection,
} as ComponentMeta<typeof SellerServiceWorkingHoursSection>;

const template: ComponentStory<typeof SellerServiceWorkingHoursSection> = (
  args
) => <SellerServiceWorkingHoursSection {...args} />;

export const Default = template.bind({});
Default.args = {
  workingDays: [...Array(7)].map(() => ({
    from: new Date(2022, 8, 11, 15),
    to: new Date(2022, 8, 11, 19),
    weekDay: "Sunday",
  })),
};
