import { storybookPartailsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { Status } from "@UI";
export default {
  title: storybookPartailsTitle + "Status",
  component: Status,
} as ComponentMeta<typeof Status>;

export const PendingStatus = () => <Status status="pending" />;
export const FailedStatus = () => <Status status="failed" />;
export const CompoletedStatus = () => <Status status="completed" />;
