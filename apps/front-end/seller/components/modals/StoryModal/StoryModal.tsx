import { getUserStoryFetcher } from "api";
import React from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType, StorySeenByUserInfo } from "types";
import {
  useStoryModal,
  SocialStoryModal,
  useStorySeenByPopup,
  StorySeenByPopup,
} from "ui";

export const useGetUserStoryKey = (userId: string, storyId?: string) =>
  `get.user.story.key.${userId || ""}.${storyId || ""}`;

function useGetUserStory(
  userId: string,
  storyId?: string,
  opts?: UseQueryOptions<any, any, AsyncReturnType<typeof getUserStoryFetcher>>
) {
  return useQuery(
    useGetUserStoryKey(userId, storyId),
    () => getUserStoryFetcher(userId, storyId),
    opts
  );
}

const viewers: StorySeenByUserInfo[] = [...Array(15)].map(() => ({
  name: "test",
  photoSrc: "/wiaah_logo.png",
}));

function useGetStoryViewers(
  storyId: string,
  opts?: UseQueryOptions<any, any, StorySeenByUserInfo[], any>
) {
  return useQuery("storyViewers", () => viewers, opts);
}

export const StoryModal = () => {
  const [userId, setUserId] = React.useState<string>();
  const [storyId, setStoryId] = React.useState<string>();
  const [storyViewers, setStoryViewers] =
    React.useState<StorySeenByUserInfo[]>();
  const [storySeenId, setStorySeenId] = React.useState<string>();

  const { listen } = useStorySeenByPopup();
  const { Listen } = useStoryModal();

  const { data } = useGetUserStory(userId, storyId, {
    enabled: !!userId,
  });

  useGetStoryViewers(storyId, {
    enabled: !!storySeenId,
    onSuccess: (data) => {
      setStoryViewers(data);
    },
  });

  function handleNext() {}

  function handlePrev() {}

  Listen((props) => {
    if (props && props.userId) {
      setUserId(props.userId);
    } else {
      setUserId(null);
    }
  });
  listen((props) => {
    console.log("emited seen");
    if (props && props.storyId) {
      setStorySeenId(props.storyId);
    } else {
      setStorySeenId(undefined);
    }
  });

  return (
    <>
      <SocialStoryModal
        next={handleNext}
        prev={handlePrev}
        story={data ? data : null}
        user={data ? data.user : null}
      />
      <StorySeenByPopup
        onSearch={() => ""}
        searchTerm={""}
        users={storyViewers || null}
      />
    </>
  );
};
