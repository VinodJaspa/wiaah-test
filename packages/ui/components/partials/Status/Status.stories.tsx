import { storybookPartailsTitle } from "utils";
import { Meta } from "@storybook/react";
import { Status } from "@UI";
export default {
  title: "UI / partials / Status",
  component: Status,
} as Meta<typeof Status>;

export const PendingStatus = () => <Status status="pending" />;
export const FailedStatus = () => <Status status="failed" />;
export const CompoletedStatus = () => <Status status="completed" />;
