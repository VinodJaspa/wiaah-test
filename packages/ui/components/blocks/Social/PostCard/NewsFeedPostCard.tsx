import React from "react";
import { ProfileInfo, PostInfo } from "types";
import {
  UserProfileDisplay,
  CommentIcon,
  HeartIcon,
  ShareIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HorizontalDotsIcon,
} from "ui";
import { Interaction } from "types";
import { useDateDiff } from "hooks";
import { useTranslation } from "react-i18next";

export interface PostCardProps {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
  onInteraction?: (interaction: Interaction) => any;
}

export const PostCard: React.FC<PostCardProps> = ({
  postInfo,
  profileInfo,
  onInteraction,
}) => {
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(postInfo.createdAt),
    to: new Date(),
  });

  const date = getSince();
  return (
    <div className="relative group rounded-[1.25rem] overflow-hidden w-full h-full">
      <img
        className="w-full h-full object-cover"
        src={
          postInfo?.attachments && postInfo.attachments.length > 0
            ? postInfo.attachments[0].src
            : ""
        }
        alt={postInfo.content}
      />

      <div className="absolute group-hover:opacity-100 opacity-0 transition-opacity bg-black bg-opacity-40 px-8 py-6 text-white top-0 left-0 bottom-0 right-0 flex flex-col w-full justify-between">
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-4 items-center">
            <div className="min-w-[2.5rem] ">
              <UserProfileDisplay
                storyUserData={{
                  name: profileInfo.name,
                  userPhotoSrc: profileInfo.thumbnail,
                }}
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-bold">{profileInfo.name}</p>
                <p>{profileInfo.profession}</p>
              </div>
              <div className="flex items-end flex-col">
                <Menu>
                  <MenuButton>
                    <HorizontalDotsIcon className="text-2xl text-white fill-white cursor-pointer" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <p className="text-black">{t("Report")}</p>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <p className="font-semibold">
                  {date ? `${date.value} ${date.timeUnit} ${t("ago")}` : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="flex noScroll gap-3 font-medium text-white overflow-x-scroll">
            {postInfo.tags.map((tag, i) => (
              <p key={i}>#{tag}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-7">
            <div className="flex gap-2 items-center">
              <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                <HeartIcon />
              </span>
              <p className="font-bold text-base">{postInfo.numberOfLikes}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                <CommentIcon />
              </span>
              <p className="font-bold text-base">{postInfo.numberOfComments}</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
              <ShareIcon />
            </span>
            <p className="font-bold text-base">{postInfo.numberOfShares}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
