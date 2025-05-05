import { AttachmentType, StoryType } from "@features/API";
import React from "react";
import { HtmlDivProps } from "types";
import { Image } from "ui";
import { cn } from "utils";

export interface PostAttachmentProps {
  src: string;
  type: AttachmentType | StoryType;
  alt?: string;
  footer?: React.ReactElement;
  style?: HtmlDivProps;
  blur?: boolean;
  cover?: boolean;
  className?: string;
  tags?: {
    x: number;
    y: number;
    title: string;
    value: string | number;
  }[];
}

export const PostAttachment: React.FC<PostAttachmentProps> = ({
  type = StoryType.Image,
  src,
  alt = "",
  footer,
  style,
  blur = false,
  cover = true,
  className,
  tags,
}) => {
  // Render image with optional blur and cover mode
  const renderImage = () => (
    <>
      {blur && (
        <Image
          className="absolute w-full h-full object-cover blur-md"
          alt={alt}
          src={src}
          data-testid="PostAttachmentBlurImage"
        />
      )}
      <Image
        className={cn(
          `w-full h-full ${cover ? "object-cover" : "object-contain"} ${
            blur ? "absolute" : ""
          }`,
          className,
        )}
        alt={alt}
        src={src}
        data-testid="PostAttachmentImage"
      />
    </>
  );

  // Render footer if provided
  const renderFooter = () =>
    footer && (
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent z-[5]">
        {footer}
      </div>
    );

  // Render tags (if applicable in the future)
  const renderTags = () =>
    tags?.map((tag, index) => (
      <div
        key={index}
        style={{
          position: "absolute",
          top: `${tag.y}%`,
          left: `${tag.x}%`,
        }}
        className="bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded"
      >
        {tag.title}: {tag.value}
      </div>
    ));

  // Conditional rendering based on attachment type
  switch (type) {
    case "image":
      return (
        <div
          className="relative flex justify-center items-center w-full h-full overflow-hidden"
          {...style}
        >
          {renderImage()}
          {renderFooter()}
          {renderTags()}
        </div>
      );

    case "video":
      return (
        <div className="relative flex justify-center items-center w-full h-full overflow-hidden">
          <video
            src={src}
            controls
            className="w-full h-full object-contain"
            data-testid="PostAttachmentVideo"
          >
            Your browser does not support the video tag.
          </video>
          {renderFooter()}
        </div>
      );

    default:
      return null;
  }
};
