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
} from "ui";
export interface SocialServicesListProps {}

export const SocialServicePostsList: React.FC<SocialServicesListProps> = () => {
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
      <PostViewPopup
        fetcher={async ({ queryKey }: any) => {
          const id = queryKey[1].postId;

          const post = ShopCardsInfoPlaceholder.find((post) => post.id === id);
          return post ? post : null;
        }}
        queryName="ServicePost"
        idParam="servicepostid"
        renderChild={(props: ShopCardInfo) => {
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
        <ListWrapper cols={isTablet ? 2 : isMobile ? 1 : 4}>
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
