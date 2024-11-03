import React from "react";
import { HtmlDivProps } from "types";
import { Image } from "ui";
import { AttachmentType, StoryType } from "@features/API";
export interface PostAttachmentProps {
  src: string;
  type: AttachmentType | StoryType;
  alt?: string;
  footer?: React.ReactElement;
  style?: HtmlDivProps;
  blur?: boolean;
  cover?: boolean;
  tags?: {
    x: number;
    y: number;
    title: string;
    value: string | number;
  }[];
}

export const PostAttachment: React.FC<PostAttachmentProps> = ({
  type = AttachmentType.Img,
  src,
  alt,
  footer,
  style,
  blur,
  cover = true,
  tags,
}) => {
  switch (type) {
    case AttachmentType.Img:
      return (
        <div
          className="flex justify-center items-center w-full h-full overflow-hidden relative"
          {...style}
        >
          {/*<div className="h-11 w-11 top-2 left-2 text-2xl flex justify-center items-center absolute z-[2] text-white fill-white bg-black bg-opacity-50 rounded-xl ">
            <HiDuplicate />
          </div>*/}
          {blur && (
            <Image
              className="object-cover absolute w-full h-full blur-md"
              alt={alt && alt}
              src={src}
              data-testid="PostAttachmentBlurImage"
            />
          )}
          <Image
            className={`${cover ? "object-cover" : "object-contain"} ${blur ? "absolute" : ""
              }  w-full h-full px-2`}
            alt={alt && alt}
            src={src}
            data-testid="PostAttachmentImage"
          />
          {footer && (
            <div className="bg-gradient-to-t from-black to-transparent w-full bottom-0 left-0 absolute z-[5]">
              {footer}
            </div>
          )}
        </div>
      );

    case AttachmentType.Vid:
      return <video src={src}></video>;
    default:
      return null;
  }
};
