import {
  storybookDataDisplayBlocksTitle,
  ActionViewer,
  actionsPlaceholders,
} from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataDisplayBlocksTitle + "ActionViewer",
  component: ActionViewer,
} as ComponentMeta<typeof ActionViewer>;

export const Default = () => <ActionViewer action={actionsPlaceholders[0]} />;
