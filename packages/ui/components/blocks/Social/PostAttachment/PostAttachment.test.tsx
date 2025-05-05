import { AttachmentType } from "@features/API/gql/generated";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { PostAttachment as PostAttachmentType } from "types";
import { PostAttachment } from "../PostAttachment";

const selectors = {
  image: "[data-testid='PostAttachmentImage']",
  video: "[data-testid='PostAttachmentVideo']",
};

const ImagePlaceholder: { src: string; type: AttachmentType } = {
  src: "/shop.jpeg",
  type: AttachmentType.Img,
};

const VideoPlaceholder: { src: string; type: AttachmentType } = {
  src: "video.mp4",
  type: AttachmentType.Vid,
};

describe("PostAttachment render tests", () => {
  let wrapperWithImg: ShallowWrapper;
  let wrapperWithVideo: ShallowWrapper;
  let img: ShallowWrapper;
  let video: ShallowWrapper;
  beforeEach(() => {
    // @ts-ignore
    wrapperWithImg = shallow(<PostAttachment {...ImagePlaceholder} />);
     // @ts-ignore
    wrapperWithVideo = shallow(<PostAttachment {...VideoPlaceholder} />);
    img = wrapperWithImg.find(selectors.image);
    video = wrapperWithVideo.find(selectors.video);
  });

  it("should have img tag with the right props", () => {
    expect(img.length).toBe(1);
    expect(img.prop("src")).toBe(ImagePlaceholder.src);
  });
  it("should have video tag with the right props", () => {
    expect(video.length).toBe(1);
    expect(video.prop("src")).toBe(VideoPlaceholder.src);
  });
});

describe("PostAttachment snapshot tests", () => {
  let wrapperWithImg: ShallowWrapper;
  let wrapperWithVideo: ShallowWrapper;
  beforeEach(() => {
     // @ts-ignore
    wrapperWithImg = shallow(<PostAttachment {...ImagePlaceholder} />);
     // @ts-ignore
    wrapperWithVideo = shallow(<PostAttachment {...VideoPlaceholder} />);
  });
  it("should match snapshot with img type", () => {
    expect(wrapperWithImg).toMatchSnapshot();
  });
  it("should match snapshot with video type", () => {
    expect(wrapperWithVideo).toMatchSnapshot();
  });
});
