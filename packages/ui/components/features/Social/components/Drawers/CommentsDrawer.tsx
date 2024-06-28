import { NumberShortner, mapArray, useForm } from "@UI/../utils/src";
import { useSocialControls } from "@blocks";
import { AttachmentType, ContentHostType } from "@features/API";
import {
  useCommentOnContent,
  useGetContentCommentsCountQuery,
  useGetContentCommentsQuery,
  useGetMyProfileQuery,
} from "@features/Social/services";
import {
  Avatar,
  DotIcon,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  ImageUploadIcon,
  Input,
  InputGroup,
  InputRightElement,
  PaperPlaneIcon,
  PenWritingIcon,
  SmilingFaceEmoji,
  VerifiedIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const CommentsDrawer: React.FC = () => {
  const { t } = useTranslation();
  const { value, hideContentComments } = useSocialControls(
    "showSocialContentComments",
  );
  const isOpen =
    typeof value?.id === "string" &&
    Object.values(ContentHostType).includes(value.type);

  const { data: comments } = useGetContentCommentsQuery(
    { id: value?.id! },
    {
      getNextPageParam: (prevPage) => {
        prevPage;
      },
      enabled: isOpen,
    },
  );

  const { data: profile } = useGetMyProfileQuery();

  const { data: commentsCount } = useGetContentCommentsCountQuery(
    { id: value?.id!, type: value?.type! },
    { enabled: isOpen },
  );

  const { inputProps, form } = useForm<Parameters<typeof mutate>[0]>(
    {
      authorProfileId: profile?.id || "",
      authorUserId: profile?.ownerId || "",
      content: "",
      contentId: value?.id || "",
      contentType: value?.type || ContentHostType.PostNewsfeed,
      mentions: [],
    },
    {
      authorProfileId: profile?.id || "",
      authorUserId: profile?.ownerId || "",
      contentId: value?.id || "",
      contentType: value?.type || ContentHostType.PostNewsfeed,
    },
  );
  const { mutate } = useCommentOnContent();

  return (
    <Drawer
      position="bottom"
      draggable
      isOpen={isOpen}
      onClose={() => hideContentComments()}
    >
      <DrawerOverlay />
      <DrawerContent className="">
        <div className="h-full overflow-y-hidden flex flex-col gap-2">
          <HStack className="justify-center">
            <p className="text-lg font-semibold">
              {NumberShortner(commentsCount || 0)} {t("Comment")}
            </p>
          </HStack>

          <div className="h-full flex flex-col gap-2">
            <div className="h-full flex flex-col gap-4 px-4 overflow-y-scroll">
              {/* This line is commented because comments has no pages it's not an infinite query */}
              {/* {mapArray(comments?.pages || [], (v, i) => ( */}
              <React.Fragment>
                {mapArray(comments?.data || [], (c, i) => (
                  <CommentCard
                    comment={{
                      id: c.id,
                      hostUserId: c.hostId,
                      content: c.content,
                      createdAt: c.commentedAt,
                      user: {
                        id: c.author?.id || "",
                        name: c.author?.username || "",
                        photo: c.author?.photo || "",
                        verified: c.author?.verified || false,
                      },
                      attachment: c.attachment
                        ? {
                            src: c.attachment.src,
                            type:
                              c.attachment.type === AttachmentType.Img
                                ? "img"
                                : "vid",
                          }
                        : undefined,
                    }}
                  />
                ))}
              </React.Fragment>
              ){/* )} */}
            </div>
            {/* <Divider /> */}
            <HStack className="items-start px-4 mb-12">
              <Avatar
                src={profile?.photo}
                alt={profile?.username}
                name={profile?.username}
              />
              <InputGroup
                style={{ overflow: "visible" }}
                className="bg-[#F4F4F4] w-full rounded-full"
              >
                <InputRightElement className="px-4 bg-white">
                  <SmilingFaceEmoji className="text-2xl" />
                </InputRightElement>
                <Input {...inputProps("content")} />
              </InputGroup>
              <ImageUploadIcon className="cursor-pointer text-2xl min-w-[1.5rem] min-h-[1.5rem]" />
              <PaperPlaneIcon
                onClick={() => mutate(form)}
                className="text-2xl cursor-pointer min-w-[1.5rem] min-h-[1.5rem]"
              />
            </HStack>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const CommentCard: React.FC<{
  comment: {
    id: string;
    user: {
      id: string;
      photo: string;
      name: string;
      verified: boolean;
    };
    content: string;
    attachment?: {
      type: "img" | "vid";
      src: string;
    };
    createdAt: string;
    hostUserId: string;
  };
}> = ({ comment }) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-1">
      <Avatar
        src={comment.user.photo}
        alt={comment.user.name}
        name={comment.user.name}
      />
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <HStack>
              <p className="font-semibold">{comment.user.name}</p>
              {comment.user.verified ? (
                <VerifiedIcon className="text-xs" />
              ) : null}
              <DotIcon className="w-1 h-1" />
              <p className="text-grayText text-xs">
                {new Date(comment.createdAt).toLocaleDateString("en-us", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              {comment?.hostUserId === comment?.user?.id ? (
                <p className="text-primary font-medium">{t("Creator")}</p>
              ) : null}
            </HStack>
            <SocialContentDisplay content={comment.content} />
            {comment.attachment ? (
              <SocialCommentAttachmentDisplay
                src={comment.attachment.src}
                type={comment.attachment.type}
              />
            ) : null}
            <HStack
              onClick={() => {}}
              className="cursor-pointer text-grayText gap-1 text-sm"
            >
              <PenWritingIcon className="text-sm" />
              <p className="text-xs">{t("Reply")}</p>
            </HStack>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SocialCommentsRepliesToggle: React.FC<{ commentId: string }> = ({
  commentId,
}) => {
  const [open, setOpen] = React.useState(false);
  // TODO
  return (
    <HStack>
      <></>
    </HStack>
  );
};

export const SocialContentDisplay: React.FC<{ content: string }> = ({
  content,
}) => {
  // TODO: colorize mentions and display emojis
  return <p className="text-sm font-medium">{content}</p>;
};

export const SocialCommentAttachmentDisplay: React.FC<{
  src: string;
  type: "img" | "vid";
}> = ({ src, type }) => {
  return type === "img" ? (
    <Image src={src} className="max-w-full" />
  ) : type === "vid" ? (
    <video src={src} className="max-w-full" />
  ) : null;
};
