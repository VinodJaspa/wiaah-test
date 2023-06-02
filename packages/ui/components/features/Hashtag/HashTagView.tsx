import React from "react";
import { TabType } from "types";
import {
  Button,
  Divider,
  SocialServicePostsList,
  HomeIcon,
  HStack,
  ServicesIcon,
  ShoppingCartIcon,
  useGetTopHashtagPostsQuery,
  useGetTopHashtagServicePost,
  useResponsive,
  SimpleTabs,
  SimpleTabHead,
  SimpleTabItemList,
  AspectRatioImage,
  GridListOrganiser,
  GridOrganiserPresets,
  useGetTrendingHashtagPosts,
  Image,
  SectionHeader,
  TabsViewer,
} from "ui";
import { useTranslation } from "react-i18next";
import { mapArray, randomNum, useBreakpointValue, useForm } from "utils";
import { PostType } from "@features/API";
import { startCase } from "lodash";

export interface HashTagViewProps {
  tag: string;
}

export const HashTagView: React.FC<HashTagViewProps> = ({ tag }) => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { isMobile } = useResponsive();
  const [idx, setIdx] = React.useState(0);

  const { data: newsfeedHashtagPosts } = useGetTopHashtagPostsQuery();
  const { data: servicePostHashtagPosts } = useGetTopHashtagServicePost({
    tag,
  });

  const { t } = useTranslation();

  function handleFollowHashtag() {}

  const tabs: TabType[] = [
    {
      name: (
        <HStack>
          <p>{t("Newsfeed")}</p>
          <HomeIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col gap-16">
          {/* <HashTagPostsListWrapper hashtags={newsfeedHashtagPosts} /> */}
          <Divider />
          {/* <PostCardsListWrapper
            cols={3}
            posts={newsfeedPosts.concat(newsfeedPosts)}
          /> */}
        </div>
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Service")}</p>
          <ServicesIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col w-full gap-16">
          {/* <HashTagPostsListWrapper hashtags={topPosts} /> */}
          <Divider />
          <SocialServicePostsList posts={[]} />
        </div>
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Shop")}</p>
          <ShoppingCartIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col gap-16">
          {/* <HashTagPostsListWrapper hashtags={topPosts} /> */}

          <Divider />

          {/* <ShopCardsListWrapper cols={cols} items={ShopCardsInfoPlaceholder} /> */}
        </div>
      ),
    },
  ];
  return isMobile ? (
    <div className="p-4 flex flex-col gap-12">
      {/* <SectionHeader sectionTitle={``} /> */}
      <SimpleTabs
        onChange={(idx) => {
          setIdx(idx);
        }}
        value={idx}
      >
        <div className="font-medium flex gap-4 justify-between">
          <SimpleTabHead>
            {[t("Newsfeed"), t("Shop"), t("Service"), t("Action")].map(
              (v, i) => (
                <button onClick={() => setIdx(i)} key={v + i}>
                  <p
                    className={`${
                      idx === i ? "border-b-primary" : "border-b-transparent"
                    } border-b pb-2 font-medium`}
                  >
                    {v}
                  </p>
                </button>
              )
            )}
          </SimpleTabHead>
        </div>
        <SimpleTabItemList>
          <HashtagPostsView postType={PostType.NewsfeedPost} tag={tag} />
          <HashtagPostsView postType={PostType.ShopPost} tag={tag} />
          <HashtagPostsView postType={PostType.ServicePost} tag={tag} />
          <HashtagPostsView postType={PostType.AffiliationPost} tag={tag} />
        </SimpleTabItemList>
      </SimpleTabs>
    </div>
  ) : (
    <div className="flex flex-col my-8">
      <div className="flex w-full px-2 justify-between">
        <div></div>
        <div className="flex flex-col w-full gap-2 items-center">
          <p className="font-bold text-2xl">#{tag}</p>
          <p className="font-bold text-xl">{`${randomNum(500)}M ${t(
            "Views"
          )}`}</p>
        </div>
        <Button
          onClick={() => {
            handleFollowHashtag();
          }}
        >
          {t("Follow")}
        </Button>
      </div>
      <TabsViewer tabs={tabs} />
    </div>
  );
};

export const HashtagPostsView: React.FC<{
  postType: PostType;
  tag: string;
}> = ({ postType, tag }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { data } = useGetTopHashtagPostsQuery();
  const { form } = useForm<Parameters<typeof useGetTrendingHashtagPosts>[0]>({
    hashtag: tag,
    take: 10,
  });
  const { data: trendingPosts, fetchNextPage } = useGetTrendingHashtagPosts(
    form,
    {
      getNextPageParam: (old) => old.nextCursor,
    }
  );

  return isMobile ? (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        {data
          ? Object.entries(data).map(([key, value]) =>
              typeof value !== "string" ? (
                <div className="flex flex-col">
                  <AspectRatioImage
                    src={value.thumbnail}
                    alt={value.content}
                    className="w-40 rounded-xl"
                    ratio={0.84}
                  />
                  <p className="text-center p-2">
                    {t("Top")} {t(startCase(key))} {t("Post")}
                  </p>
                </div>
              ) : null
            )
          : null}
      </div>

      <p>{t("All Posts")}</p>
      <GridListOrganiser presets={GridOrganiserPresets.socialPostsGrid}>
        {mapArray(trendingPosts?.pages, (page, i) => (
          <React.Fragment key={i}>
            {mapArray(page.data, (post) => (
              <Image
                src={post.thumbnail}
                className="w-full h-full object-cover"
                key={post.id}
              ></Image>
            ))}
          </React.Fragment>
        ))}
      </GridListOrganiser>
    </div>
  ) : null;
};
