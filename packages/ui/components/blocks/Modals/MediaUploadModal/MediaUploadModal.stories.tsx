import { MediaUploadModal, Button, useFileUploadModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "MediaUploadModal",
  component: MediaUploadModal,
} as ComponentMeta<typeof MediaUploadModal>;

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
