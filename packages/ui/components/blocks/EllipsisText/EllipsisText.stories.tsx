import { storybookBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import { EllipsisText } from "@UI";

export default {
  title: "UI / blocks / EllipisisText",
  component: EllipsisText,
} as Meta<typeof EllipsisText>;

export const Default = () => {
  return (
    <EllipsisText maxLines={5}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nesciunt
      omnis exercitationem quaerat ab tempore. Aliquid neque quod sunt vero
      suscipit illo praesentium distinctio ex, assumenda ipsam debitis, sequi
      ut?
    </EllipsisText>
  );
};
