import React from "react";
import {
  ListWrapper,
  TabsViewer,
  useDiscoverTabs,
  UserProfile,
  placesPlaceholder,
  LocationButton,
  HashTagSearchItem,
  GridListOrganiser,
  PostCard,
  useGetDiscoverPosts,
  PostType,
  useGetDiscoverUsers,
  usePaginationControls,
  ScrollPaginationWrapper,
  useGetDiscoverHashtags,
} from "ui";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

const discoverPlacesPlaceHolder: string[] = [...Array(5)].reduce((acc) => {
  return [...acc, ...placesPlaceholder];
}, []);
const hashTagsPlaceholder: string[] = ["gaming", "art", "funny"];

export const DiscoverView: React.FC = ({}) => {
  const { t } = useTranslation();
  const { discoverTabs, currentTab, setTabsData } = useDiscoverTabs();
  const [search, setSearch] = React.useState<string>();

  const { visit } = useRouting();

  const { pagination: usersPagination, controls: usersControls } =
    usePaginationControls();
  const { pagination: postsPagination, controls: postsControls } =
    usePaginationControls();
  const { pagination: hashtagPagination, controls: hashtagControls } =
    usePaginationControls();

  const { data: discoverUsers } = useGetDiscoverUsers({
    q: search,
    pagination: usersPagination,
  });

  const { data: discoverPosts } = useGetDiscoverPosts({
    q: search,
  });

  const { data: discoverHashtags } = useGetDiscoverHashtags({
    q: search,
    pagination: hashtagPagination,
  });

  React.useEffect(() => {
    setTabsData([
      {
        name: t("community", "community"),
        component: (
          <ScrollPaginationWrapper controls={postsControls}>
            <GridListOrganiser
              rowSize="14.5rem"
              presets={[
                {
                  cols: 5,
                  points: [
                    { c: 2, r: 1 },
                    { c: 1, r: 2 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 2, r: 2 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                    { c: 1, r: 1 },
                  ],
                },
              ]}
            >
              {discoverPosts.map((item, i) =>
                item.type === PostType.NewsfeedPost ? (
                  <PostCard
                    postInfo={item.newsfeed}
                    profileInfo={item.newsfeed.publisher}
                    key={item.id}
                  />
                ) : null
              )}
            </GridListOrganiser>
          </ScrollPaginationWrapper>
        ),
        link: "/",
      },
      {
        name: t("users", "users"),
        component: (
          <ScrollPaginationWrapper controls={usersControls}>
            <ListWrapper>
              {discoverUsers.accounts.map((user, i) => (
                <UserProfile user={user.profile} key={i} />
              ))}
            </ListWrapper>
          </ScrollPaginationWrapper>
        ),
        link: "users",
      },
      {
        name: t("places", "places"),
        component: (
          <ListWrapper>
            {discoverPlacesPlaceHolder.map((place, i) => (
              <LocationButton name={place} key={i} />
            ))}
          </ListWrapper>
        ),
        link: "places",
      },
      {
        name: t("hashtags", "hashtags"),
        component: (
          <ScrollPaginationWrapper controls={hashtagControls}>
            <ListWrapper>
              {discoverHashtags.map((tag, i) => (
                <HashTagSearchItem
                  props={{
                    onClick: () => {
                      visit((r) => r.visitSellerHashtagPage(tag.name));
                    },
                  }}
                  key={tag.id}
                  hashtagName={tag.name}
                  hashtagViews={tag.usage}
                />
              ))}
            </ListWrapper>
          </ScrollPaginationWrapper>
        ),
        link: "hashtags",
      },
    ]);
  }, []);
  return (
    <div className="flex flex-col overflow-y-scroll thinScroll items-start pt-4 h-full">
      <TabsViewer
        showTabs={false}
        currentTabIdx={currentTab}
        tabs={discoverTabs}
      />
    </div>
  );
};
