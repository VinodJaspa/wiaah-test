import { usePagination, useResponsive } from "hooks";
import { ShopCardsInfoPlaceholder } from "placeholder";
import React from "react";
import { useRouting } from "routing";
import { ShopCardInfo } from "types";
import {
  useGetServicesPostsQuery,
  ListWrapper,
  SocialServicePostCard,
  SpinnerFallback,
  PostViewPopup,
  SocialServiceDetailsCard,
  SocialServiceDetailsModal,
  SocialServiceDetailsCardProps,
} from "ui";
import { randomNum } from "utils";
export interface SocialServicesPostsListProps {}

export const SocialServicePostsList: React.FC<
  SocialServicesPostsListProps
> = () => {
  const { take, page } = usePagination(16);
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServicesPostsQuery({ take, page });
  const { isMobile, isTablet } = useResponsive();
  const { visit } = useRouting();
  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      <PostViewPopup<SocialServiceDetailsCardProps>
        fetcher={async ({ queryKey }: any) => {
          const id = queryKey[1].postId;
          const sentence =
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley";

          const post = ShopCardsInfoPlaceholder.find((post) => post.id === id);
          return {
            id: "123",
            label: "label",
            name: "service post",
            createdAt: new Date().toString(),
            attachements: [
              {
                src: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW1lcmljYW4lMjBob3VzZXN8ZW58MHx8MHx8&w=1000&q=80",
                type: "image",
              },
              { src: "/video.mp4", type: "video" },
            ],
            type: "hotel",
            content: sentence.substring(0, randomNum(sentence.length)),
            profileInfo: {
              accountType: "seller",
              id: "1263",
              name: "seller name",
              public: true,
              thumbnail: "/shop-2.jpeg",
              verified: true,
            },
            price: randomNum(123),
            rate: randomNum(159),
            views: randomNum(153),
            hashtags: ["fashion", "gaming"],
            cashback: { amount: 15, type: "cash" },
            discount: randomNum(20),
            postInteraction: {
              likes: randomNum(300),
              comments: randomNum(100),
            },
          };
        }}
        queryName="ServicePost"
        idParam="servicepostid"
        renderChild={(props) => {
          return (
            <SocialServiceDetailsCard
              showCommentInput={false}
              showInteraction={false}
              {...props}
            />
          );
        }}
      />
      {Array.isArray(res?.data) ? (
        <ListWrapper cols={isTablet ? 2 : isMobile ? 1 : 3}>
          {res?.data.map((post) => (
            <SocialServicePostCard
              onServiceClick={(id) =>
                visit((routes) => routes.addQuery({ servicepostid: id }))
              }
              {...post}
            />
          ))}
        </ListWrapper>
      ) : null}
      <SocialServiceDetailsModal />
    </SpinnerFallback>
  );
};
