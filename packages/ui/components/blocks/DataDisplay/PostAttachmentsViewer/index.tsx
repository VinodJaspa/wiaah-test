import React from "react";
import { HiLocationMarker, HiUser } from "react-icons/hi";
import { PostAttachment as PostAttachmentType, ProfileInfo } from "types";
import {
  ControlledCarousel,
  PostAttachment,
  ControlledCarouselProps,
} from "ui";
export interface PostAttachmentsViewerProps {
  attachments: PostAttachmentType[];
  profileInfo?: ProfileInfo;
  showFooter?: boolean;
  carouselProps?: Partial<ControlledCarouselProps>;
  renderOne?: boolean;
}

export const PostAttachmentsViewer: React.FC<PostAttachmentsViewerProps> = ({
  attachments,
  profileInfo,
  showFooter,
  carouselProps,
  renderOne,
}) => {
  const [active, setActive] = React.useState<number>();
  return (
    <div className="h-full">
      {attachments && !renderOne && attachments.length > 1 ? (
        <ControlledCarousel
          w={"100%"}
          h="100%%"
          data-testid="test"
          arrows={attachments.length > 1}
          gap={0}
          onCurrentActiveChange={setActive}
          {...carouselProps}
        >
          {attachments.map((attachment, i) => (
            <PostAttachment
              play={i === active}
              key={attachment.src + i}
              type={attachment.type}
              src={attachment.src}
              alt={attachment.postLocation}
              footer={
                showFooter ? (
                  <div className="flex items-center gap-2 text-white text-2xl">
                    {attachment.postLocation && (
                      <div className="flex items-center gap-2">
                        <HiLocationMarker />
                        <span className="text-lg">
                          {attachment.postLocation}
                        </span>
                      </div>
                    )}
                    {profileInfo && profileInfo.name && (
                      <div className="flex items-center gap-2">
                        <HiUser />
                        <span className="text-lg">{profileInfo.name}</span>
                      </div>
                    )}
                  </div>
                ) : undefined
              }
            />
          ))}
        </ControlledCarousel>
      ) : (
        attachments &&
        attachments.length > 0 && (
          <PostAttachment
            {...attachments[0]}
            alt={profileInfo && profileInfo.name}
            footer={
              <div className="flex items center gap-2 p-2 text-white font-4xl">
                {attachments[0].postLocation && (
                  <div className="flex items-center gap-2">
                    <HiLocationMarker />
                    <span className="text-lg">
                      {attachments[0].postLocation}
                    </span>
                  </div>
                )}
                {profileInfo && profileInfo.name && (
                  <div className="flex items-center gap-2">
                    <HiUser />
                    <span className="text-lg">
                      {profileInfo && profileInfo.name}
                    </span>
                  </div>
                )}
              </div>
            }
          />
        )
      )}
    </div>
  );
};
