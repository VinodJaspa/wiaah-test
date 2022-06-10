import { storybookBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { EllipsisText } from "ui";

export default {
  title: storybookBlocksTitle + "EllipisisText",
  component: EllipsisText,
} as ComponentMeta<typeof EllipsisText>;

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
