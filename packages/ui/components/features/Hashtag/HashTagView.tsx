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
  useGetTrendingHashtagPosts,
  Image,
  TabsViewer,
  AspectRatio,
  Avatar,
  Verified,
  LocationOutlineIcon,
  AddToCartProductButton,
  CarOutlineIcon,
  BookServiceButton,
  EyeIcon,
  SectionHeader,
  HashTagPostsListWrapper,
  SocialHashTagTopPosts,
  SocialProfileActionList,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  SocialShopCard,
} from "ui";

import { newsfeedPosts } from "ui/placeholder";
import { useTranslation } from "react-i18next";
import { NumberShortner, randomNum, useBreakpointValue, useForm } from "utils";
import { PostType, StoreType } from "@features/API";
import { startCase } from "lodash";
import { useGetTopHashtagProductPosts } from "@features/Social/services/Queries/ShopPost/useGetTopHashtagProductPosts";
import { useGetTopHashtagActionsQuery } from "@features/Social/services/Queries/Action/useGetTopHashtagActions";
import { SocialShopCardsInfoPlaceholder } from "placeholder";

export interface HashTagViewProps {
  tag: string;
}

export const HashTagView: React.FC<HashTagViewProps> = ({ tag }) => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { isMobile } = useResponsive();
  const [idx, setIdx] = React.useState(0);

  const { data: newsfeedHashtagPosts } = useGetTopHashtagPostsQuery(tag);
  const { data: servicePostHashtagPosts } = useGetTopHashtagServicePost({
    tag,
  });

  const { t } = useTranslation();

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
          <HashTagPostsListWrapper hashtags={newsfeedHashtagPosts} />
          <Divider />
          <PostCardsListWrapper
            cols={3}
            posts={newsfeedPosts.concat(newsfeedPosts)}
          />
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
          <HashTagPostsListWrapper hashtags={newsfeedHashtagPosts} />
          <Divider />
          // <SocialServicePostsList posts={[]} />
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
          <HashTagPostsListWrapper hashtags={newsfeedHashtagPosts} />

          <Divider />

          <ShopCardsListWrapper
            cols={cols}
            items={SocialShopCardsInfoPlaceholder}
          />
        </div>
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Action")}</p>
        </HStack>
      ),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={[]} />

          <Divider />

          <SocialProfileActionList userId="" />
        </div>
      ),
    },
  ];
  return isMobile ? (
    <div className="p-4 flex flex-col gap-12">
      <SectionHeader sectionTitle={`#${tag}`} />
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
          <HashtagPostsView postType={"action"} tag={tag} />
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
  postType: PostType | "action";
  tag: string;
}> = ({ postType, tag }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { form } = useForm<Parameters<typeof useGetTrendingHashtagPosts>[0]>({
    hashtag: tag,
    take: 10,
  });
  const {
    data: trendingPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetTrendingHashtagPosts(form, {
    getNextPageParam: (old) => old.nextCursor,
  });

  const { data: topNewsfeed } = useGetTopHashtagPostsQuery(tag);
  const { data: topProducts } = useGetTopHashtagProductPosts({ tag });
  const { data: topServices } = useGetTopHashtagServicePost({ tag });
  const { data: topActions } = useGetTopHashtagActionsQuery({ tag });

  const TopPosts =
    postType === PostType.NewsfeedPost
      ? topNewsfeed
      : postType === PostType.ShopPost
      ? topProducts
      : postType === PostType.ServicePost
      ? topServices
      : topActions;

  return isMobile ? (
    <div className="flex flex-col ">
      <div className="flex gap-2 ">
        {TopPosts
          ? Object.entries(TopPosts).map(([key, value]) => {
              const thumbnail =
                postType === PostType.NewsfeedPost
                  ? value.thumbnail
                  : postType === PostType.ShopPost
                  ? value.product.thumbnail
                  : postType === PostType.ServicePost
                  ? value.service.thumbnail
                  : value.cover;

              const views = value.views;
              return typeof value !== "string" ? (
                <div className="flex gap-2 flex-col">
                  <AspectRatioImage
                    src={thumbnail}
                    alt={""}
                    className="w-40 rounded-xl overflow-hidden"
                    ratio={1}
                  >
                    <HStack className="text-white px-2 py-1 rounded absolute bottom-2 left-2 bg-black/25 text-sm">
                      <EyeIcon />
                      <p>{NumberShortner(views)}</p>
                    </HStack>
                  </AspectRatioImage>
                  <p className="text-center font-semibold p-2">
                    {t("Top")} {t(startCase(key))} {t(`${startCase(postType)}`)}
                  </p>
                </div>
              ) : null;
            })
          : null}
      </div>

      <p className="font-medium text-lg">{t("All Posts")}</p>
      {/* TODO: */}
      <SocialProfileActionList userId="" />
      {/* <ScrollCursorPaginationWrapper
        controls={{ hasMore: hasNextPage || false, next: fetchNextPage }}
      >
        <GridListOrganiser presets={GridOrganiserPresets.socialPostsGrid}>
          {mapArray(trendingPosts?.pages, (page, i) => (
            <React.Fragment key={i}>
              {mapArray(page.data, (post) => (
                <AspectRatioImage
                  ratio={1.2}
                  alt={post.id}
                  src={post.thumbnail}
                  className="w-full h-full object-cover"
                  key={post.id}
                >
                  <p>{NumberShortner(post.views)}</p>
                </AspectRatioImage>
              ))}
            </React.Fragment>
          ))}
        </GridListOrganiser>
      </ScrollCursorPaginationWrapper> */}
    </div>
  ) : null;
};

export const HashtagSearchProdcutCard: React.FC<{
  thumbnail: string;
  title: string;
  verified: boolean;
  id: string;
  sellerId: string;
  categoryLabel: string;
  sellerThumbnail: string;
  location: string;
  storeType: StoreType;
}> = ({
  id,
  sellerId,
  thumbnail,
  title,
  sellerThumbnail,
  verified,
  categoryLabel,
  location,
  storeType,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 w-full">
      <AspectRatio ratio={1.2}>
        <Image src={thumbnail} className="w-full h-full object-cover" />
        <div className="absolute text-xs top-1 left-1 bg-black/30 text-white">
          {categoryLabel}
        </div>
      </AspectRatio>

      <div className="flex gap-2">
        <Avatar
          className="max-w-[1.5rem] max-h-[1.5rem]"
          src={sellerThumbnail}
        />
        <p>{title}</p>

        {verified ? <Verified className="text-secondaryBlue" /> : null}
      </div>

      <HStack className="text-xs">
        <LocationOutlineIcon />
        <p>{location}</p>
      </HStack>

      {storeType === StoreType.Product ? (
        <AddToCartProductButton
          productId={id}
          className="w-full"
          colorScheme="darkbrown"
        >
          <HStack>
            <CarOutlineIcon />
            <p>{t("Add to cart")}</p>
          </HStack>
        </AddToCartProductButton>
      ) : (
        <BookServiceButton
          className="w-full"
          colorScheme="darkbrown"
          serviceId={id}
        >
          <HStack>
            <p>{t("Book now")}</p>
          </HStack>
        </BookServiceButton>
      )}
    </div>
  );
};
