import { storybookBlocksTitle, PostAttachmentsViewer } from "@UI";
import { PostCardPlaceHolder } from "placeholder";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / PostAttachmentViewer",
  component: PostAttachmentsViewer,
} as Meta<typeof PostAttachmentsViewer>;

export const Default = () => (
  <PostAttachmentsViewer
    attachments={PostCardPlaceHolder.postInfo.attachments || []}
  />
);
