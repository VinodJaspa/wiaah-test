import { HStack, Icon, Text } from "@chakra-ui/react";
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
    <>
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
                  <HStack color="white" fontSize={"x-large"}>
                    {attachment.postLocation && (
                      <HStack>
                        <Icon as={HiLocationMarker} />
                        <Text fontSize={"md"}>{attachment.postLocation}</Text>
                      </HStack>
                    )}
                    {profileInfo && profileInfo.name && (
                      <HStack>
                        <Icon as={HiUser} />
                        <Text fontSize={"md"}>{profileInfo.name}</Text>
                      </HStack>
                    )}
                  </HStack>
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
              <HStack p="0.5rem" color="white" fontSize={"xx-large"}>
                {attachments[0].postLocation && (
                  <HStack>
                    <Icon as={HiLocationMarker} />
                    <Text fontSize={"md"}>{attachments[0].postLocation}</Text>
                  </HStack>
                )}
                {profileInfo && profileInfo.name && (
                  <HStack>
                    <Icon as={HiUser} />
                    <Text fontSize={"md"}>
                      {profileInfo && profileInfo.name}
                    </Text>
                  </HStack>
                )}
              </HStack>
            }
          />
        )
      )}
    </>
  );
};
