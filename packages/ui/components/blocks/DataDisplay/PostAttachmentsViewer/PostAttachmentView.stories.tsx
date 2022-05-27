import { storybookBlocksTitle, PostAttachmentsViewer } from "ui";
import { PostCardPlaceHolder } from "ui/placeholder";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "PostAttachmentViewer",
  component: PostAttachmentsViewer,
} as ComponentMeta<typeof PostAttachmentsViewer>;

export const Default = () => (
  <PostAttachmentsViewer
    attachments={PostCardPlaceHolder.postInfo.attachments || []}
  />
);
