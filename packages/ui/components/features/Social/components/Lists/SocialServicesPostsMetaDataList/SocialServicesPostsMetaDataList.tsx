import { getServicePostDataFetcher } from "api";
import { usePagination } from "hooks";
import React from "react";
import { useRouting } from "routing";
import { ShopCardInfo } from "types";
import {
  ServicesSearchGrid,
  useGetServicesPostsOnMapDataQuery,
  SocialServicePostMetaDataCard,
  SpinnerFallback,
  PostViewPopup,
  SocialServiceDetailsCard,
} from "ui";

export const SocialServicesPostsMetaDataList: React.FC = () => {
  const { page, take } = usePagination();
  const { visit } = useRouting();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServicesPostsOnMapDataQuery({}, { page, take });
  return (
    <>
      <PostViewPopup
        fetcher={async ({ queryKey }: any) => {
          const id = queryKey[1].postId;

          const post = await getServicePostDataFetcher({});
          return post;
        }}
        queryName="ServicePost"
        idParam="servicepostid"
        renderChild={(props: ShopCardInfo) => {
          return (
            //@ts-ignore
            <SocialServiceDetailsCard
              showCommentInput={false}
              showInteraction={false}
              {...props}
            />
          );
        }}
      />

      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesSearchGrid
            component={SocialServicePostMetaDataCard}
            data={res?.data}
            handlePassData={(props) => ({
              ...props,
              onClick: () =>
                visit((r) => r.addQuery({ servicepostid: props.id })),
            })}
          />
        ) : null}
      </SpinnerFallback>
    </>
  );
};
