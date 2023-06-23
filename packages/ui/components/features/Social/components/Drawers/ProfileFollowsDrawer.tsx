import { ScrollingWrapper, useSocialControls } from "@blocks";
import {
  useGetSocialProfileFollowers,
  useGetSocialProfileFollowersInfiniteQuery,
  useGetSocialProfileFollowingQuery,
  useGetSocialProfileFollowingsInfiniteQuery,
} from "@features/Social/services";
import {
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  HStack,
  ScrollCursorPaginationWrapper,
} from "@partials";
import { useGetSocialProfile } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { SocialAvatarWithStory } from "../DataDisplay";

export const ProfileFollowsDrawer: React.FC = () => {
  const { value, hideProfileFollowers, showProfileFollowers } =
    useSocialControls("showProfileFollowers");

  const isOpen = typeof value === "string";

  const { data } = useGetSocialProfileFollowingsInfiniteQuery();
  const { data: profile } = useGetSocialProfile(value!);

  const { t } = useTranslation();

  return (
    <Drawer isOpen onClose={hideProfileFollowers}>
      <DrawerContent>
        <DrawerHeader onBack={hideProfileFollowers}>
          <HStack>
            <p>{}</p>
          </HStack>
        </DrawerHeader>
        <></>
      </DrawerContent>
    </Drawer>
  );
};

const ProfileFollowersList: React.FC<{ userId: string }> = ({ userId }) => {
  const { t } = useTranslation();
  const { data, hasNextPage, fetchNextPage } =
    useGetSocialProfileFollowersInfiniteQuery(
      {
        userId,
        take: 10,
      },
      { getNextPageParam: (last, all) => last.nextCursor }
    );

  return (
    <ScrollCursorPaginationWrapper
      controls={{ hasMore: !!hasNextPage, next: fetchNextPage }}
    >
      <div className="flex flex-col gap-4">
        {mapArray(data?.pages, (page, i) => (
          <React.Fragment key={i}>
            {mapArray(page.data, (profile) => (
              <HStack key={profile.id} className="justify-between">
                <div className="flex gap-2">
                  <SocialAvatarWithStory
                    src={profile.photo}
                    userId={profile.ownerId}
                    hasNewStory={profile.newStory}
                    className="text-5xl"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-medium">{profile.username}</p>
                  </div>
                </div>
                <Button onClick={() => {}}>{t("Follow")}</Button>
              </HStack>
            ))}
          </React.Fragment>
        ))}
      </div>
    </ScrollCursorPaginationWrapper>
  );
};
