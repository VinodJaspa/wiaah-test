import { useForm } from "@UI/../utils/src";
import { newsfeedPosts } from "@UI/placeholder";
import {
  PostCardsListWrapper,
  ScrollableStories,
  usePaginationControls,
  useStoryModal,
} from "@blocks";
import { PostType } from "@features/API";
import { useResponsive } from "@src/index";
import {
  PersonalizeActions,
  PostCardPlaceHolder,
  storiesPlaceholder,
} from "placeholder";
import React from "react";
import { useRouting } from "routing";
import { useSocialControls } from "ui";
import { SocialNewsfeedPostMobileCard } from "../components/Cards/SocialNewsfeedPostMobileCard";
import { useGetMyNewsfeedPostsQuery, useGetRecentStories } from "../services";

const FAKE_RECENT_STORIES_DATA = [
  {
    newStory: "Just finished reading an amazing book!",
    userId: "user123",
    user: {
      id: "user123",
      profile: {
        id: "profile123",
        photo: "/shop-2.jpeg",
        profession: "Software Engineer",
        username: "tech_guru",
      },
    },
  },
  {
    newStory: "Exploring the beautiful landscapes of New Zealand.",
    userId: "user456",
    user: {
      id: "user456",
      profile: {
        id: "profile456",
        photo: "/shop-3.jpeg",
        profession: "Travel Blogger",
        username: "wanderlust_jane",
      },
    },
  },
  {
    newStory: "Cooked a delicious homemade lasagna today.",
    userId: "user789",
    user: {
      id: "user789",
      profile: {
        id: "profile789",
        photo: "/shop-4.jpeg",
        profession: "Chef",
        username: "foodie_chef",
      },
    },
  },
];

interface SocialNewsfeedViewProps {
  isDiscover?: boolean;
  isHome?: boolean;
}

const SocialNewsfeedView: React.FC<SocialNewsfeedViewProps> = ({
  isDiscover,
  isHome,
}) => {
  const { isMobile } = useResponsive();
  const { OpenModal } = useStoryModal();
  const { visit } = useRouting();

  const { openSocialNewPostModal } = useSocialControls();

  const { pagination: storiesPagination } = usePaginationControls();
  const { data: _recentStories } = useGetRecentStories({
    pagination: storiesPagination,
  });
  const recentStories = FAKE_RECENT_STORIES_DATA;

  const { pagination: postsPagination } = usePaginationControls();
  const { form } = useForm<Parameters<typeof useGetMyNewsfeedPostsQuery>[0]>(
    { pagination: postsPagination, type: PostType.NewsfeedPost },
    { pagination: postsPagination },
  );
  const { data: _data } = useGetMyNewsfeedPostsQuery(form);


  const data = newsfeedPosts;
  // console.log(data,"data___");

  const normalizedPersonalizedActions = PersonalizeActions.map((action) => ({
    profileInfo: {
      ...PostCardPlaceHolder.profileInfo,
      name: action.profile.username,
      photo: action.profile.photo,
    },
    postInfo: {
      ...PostCardPlaceHolder.postInfo,
      id: action.id,
      thumbnail: action.src,
      attachments: [
        {
          type: "video",
          src: action.src,
          postLocation: action.location
            ? `${action.location.city}, ${action.location.country}`
            : "",
        },
      ],
      numberOfComments: action.comments,
      numberOfLikes: action.reactionNum,
      numberOfShares: action.shares,
      location: action.location
        ? {
          city: action.location.city,
          country: action.location.country,
        }
        : undefined,
      musicId: action.musicId,
      effect: action.effect?.name,
      createdAt: new Date().toISOString(),
      tags: action.tags.map((tag) => tag.userId),
    },
  }));

  const interleaveAtOddIndices = (baseArray: any[], itemsToInsert: any[]) => {
    const result = [...baseArray];
    let insertIndex = 1;

    for (const item of itemsToInsert) {
      if (insertIndex >= result.length) {
        result.push(item);
      } else {
        result.splice(insertIndex, 0, item);
      }
      insertIndex += 2;
    }

    return result;
  };

  const discoverData = interleaveAtOddIndices(
    newsfeedPosts,
    normalizedPersonalizedActions,
  );
  console.log(data ,"data44");
  

  return (
    <div className="flex flex-col items-center w-full gap-8  px-2 md:px-8">
      {!isDiscover && (
        <div className="flex w-full items-center overflow-x-scroll gap-6 noScroll">
          <div className="min-w-[4.75rem]">
            <ScrollableStories stories={storiesPlaceholder} />
          </div>
        </div>
      )}

      <div className="w-full">
        {/* Mobile view */}
        <div className="flex flex-col gap-8 lg:hidden">
          {data?.map((v, i) => (
            <SocialNewsfeedPostMobileCard
              key={i}
              post={{
                id: v.postInfo.id,
                comments: v.postInfo.numberOfComments,
                content: v.postInfo.content!,
                createdAt: v.postInfo.createdAt,
                images: v.postInfo?.attachments?.map((v) => v.src) || [""],
                liked: true,
                likes: v.postInfo.numberOfLikes,
                location: {
                  city: "geneve",
                  country: "switzerland",
                },
                saved: false,
                shares: v.postInfo.numberOfShares,
                username: v.profileInfo?.name || "",
                userPhoto: v.profileInfo?.photo || "",
                verified: false,
              }}
            />
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden lg:block">
          <PostCardsListWrapper
            isHome={isHome}
            isDiscover={isDiscover}
            grid={true}
            onPostClick={(post) => {
              // TODO: Handle post click
              // openSocialPostModal(post.postInfo.id);
            }}
            onProfileClick={(username) =>
              visit((r) => r.visitSocialProfile(username))
            }
            posts={isDiscover ? discoverData : data}
          />
        </div>
      </div>
    </div>
  );
};
export default SocialNewsfeedView;
