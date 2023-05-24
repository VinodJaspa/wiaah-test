import { useDateDiff } from "@UI/../hooks";
import { useGetSocialPostQuery } from "@features/Social/services";
import {
  Avatar,
  CommentIcon,
  CommentOutlineIcon,
  HStack,
  HeartFillIcon,
  HeartOutlineIcon,
  HorizontalDotsIcon,
  PaperPlaneAngleIcon,
  PaperPlaneAngleOutlineIcon,
  SaveFlagFIllIcon,
  SaveFlagOutlineIcon,
  VerifiedIcon,
} from "@partials";
import React from "react";
import { SocialPostOptionsDropdown } from "./DropdownOptions";
import { NumberShortner, mapArray } from "@UI/../utils/src";
import { useTranslation } from "react-i18next";
import { CommentInput } from "@blocks";
import { PostCommentsList } from "../Lists";

export const SocialPostDetails: React.FC<{ postId: string }> = ({ postId }) => {
  const { data, isLoading } = useGetSocialPostQuery({ id: postId });
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(data?.createdAt || new Date()),
    to: new Date(Date.now()),
  });
  const Since = getSince();

  const interactions: {
    icon: React.ReactElement;
    activeIcon: React.ReactElement;
    isActive: boolean;
    label: string;
  }[] = [
    {
      icon: <HeartOutlineIcon />,
      activeIcon: <HeartFillIcon />,
      isActive: false,
      label: `${NumberShortner(data?.reactionNum || 0)}`,
    },
    {
      icon: <CommentOutlineIcon />,
      activeIcon: <CommentIcon />,
      isActive: false,
      label: `${NumberShortner(data?.comments || 0)}`,
    },
    {
      icon: <PaperPlaneAngleOutlineIcon />,
      activeIcon: <PaperPlaneAngleIcon />,
      isActive: false,
      label: `${NumberShortner(data?.shares || 0)}`,
    },
    {
      icon: <SaveFlagOutlineIcon />,
      activeIcon: <SaveFlagFIllIcon />,
      isActive: false,
      label: `${t("Save")}`,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <HStack>
          <Avatar
            src={data?.publisher?.photo}
            name={data?.publisher?.username}
            alt={data?.publisher?.username}
          />
          <div className="flex flex-col gap-1">
            <HStack>
              <p className="text-xl font-semibold">
                {data?.publisher?.username}
              </p>
              {data?.publisher?.verified ? (
                <VerifiedIcon className="text-xs" />
              ) : null}
            </HStack>
            <p className="text-xs text-grayText">
              {Since.value} {Since.timeUnit}
            </p>
          </div>
        </HStack>
        <SocialPostOptionsDropdown postId={postId}>
          <HorizontalDotsIcon />
        </SocialPostOptionsDropdown>
      </div>

      <HStack className="justify-around py-2">
        {mapArray(interactions, (v, i) => (
          <div key={i} className="flex flex-col justify-center">
            {v.isActive ? v.activeIcon : v.icon}
            <p className="text-xs font-medium">{v.label}</p>
          </div>
        ))}
      </HStack>

      <CommentInput />
      <PostCommentsList postId={postId} />

      <p className="text-center text-lg font-semibold">
        {`${t("View")} ${data?.publisher?.username} ${t("other posts")}`}
      </p>
    </div>
  );
};
