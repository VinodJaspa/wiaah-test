import { MediaUploadModal, Button, useFileUploadModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /MediaUploadModal",
  component: MediaUploadModal,
} as Meta<typeof MediaUploadModal>;

export const uploadImage = () => {
  const { uploadImage } = useFileUploadModal();
  return (
    <>
      <Button onClick={() => uploadImage()}>open</Button>
      <MediaUploadModal />
    </>
  );
};

export const uploadVideo = () => {
  const { uploadVideo } = useFileUploadModal();
  return (
    <>
      <Button onClick={() => uploadVideo()}>open</Button>
      <MediaUploadModal />
    </>
  );
};
