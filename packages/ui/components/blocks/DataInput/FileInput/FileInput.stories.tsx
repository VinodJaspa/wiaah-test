import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import { FileInput } from "@UI";

export default {
  title: "UI / blocks / Data Input /FileInput",
  component: FileInput,
} as Meta<typeof FileInput>;

export const Default = () => (
  <FileInput id="test">
    <span className="cursor-pointer">upload</span>
  </FileInput>
);
export const onlyPictures = () => (
  <FileInput accept="picture" id="test">
    <span className="cursor-pointer">upload</span>
  </FileInput>
);

export const onlyVideos = () => (
  <FileInput accept="video" id="test">
    <span className="cursor-pointer">upload</span>
  </FileInput>
);

export const onlyImagesOrVideos = () => (
  <FileInput accept="both" id="test">
    <span className="cursor-pointer">upload</span>
  </FileInput>
);
