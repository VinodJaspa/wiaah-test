import {
  storybookDataDisplayBlocksTitle,
  ActionViewer,
  actionsPlaceholders,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /ActionViewer",
  component: ActionViewer,
} as Meta<typeof ActionViewer>;

export const Default = () => <ActionViewer action={actionsPlaceholders[0]} />;
