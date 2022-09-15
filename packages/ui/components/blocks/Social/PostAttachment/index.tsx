import React from "react";
import { HtmlDivProps, PostAttachment as PostAttachmentType } from "types";
import { HiDuplicate } from "react-icons/hi";
import { Image } from "ui";
export interface PostAttachmentProps extends PostAttachmentType {
  alt?: string;
  footer?: React.ReactElement;
  style?: HtmlDivProps;
  blur?: boolean;
  cover?: boolean;
}

export const PostAttachment: React.FC<PostAttachmentProps> = ({
  type = "image",
  src,
  alt,
  footer,
  style,
  blur,
  cover,
}) => {
  function handleGoToPost() {
    // router.push("localhost:3002/social/wiaah/newsfeed-post/15");
  }

  switch (type) {
    case "image":
      return (
        <div
          className="flex justify-center items-center w-full h-full overflow-hidden relative"
          {...style}
        >
          <div className="h-11 w-11 top-2 left-2 text-2xl flex justify-center items-center absolute z-[2] text-white fill-white bg-black bg-opacity-50 rounded-xl ">
            <HiDuplicate />
          </div>
          {blur && (
            <Image
              className="object-cover absolute w-full h-full blur-md"
              alt={alt && alt}
              src={src}
              data-testid="PostAttachmentBlurImage"
            />
          )}
          <Image
            className={`${cover ? "object-cover" : "object-contain"} ${
              blur ? "absolute" : ""
            }  max-w-full max-h-full`}
            alt={alt && alt}
            src={src}
            data-testid="PostAttachmentImage"
            onClick={handleGoToPost}
          />
          {footer && (
            <div className="bg-gradient-to-t from-black to-transparent w-full bottom-0 left-0 absolute z-[5]">
              {footer}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};
