
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  AffiliationIcon,
  AffiliationIconOutline,
  MostLikedPost,
  NewsFeedIcon,
  NewsFeedOutlineIcon,
  PostCardsListWrapper,
  ServiceCardsListWrapper,
  ServicesIcon,
  ServicesOutlineIcon,
  ShadcnText,
  ShopCardsListWrapper,
  ShoppingCartIcon,
  ShoppingCartOutlineIcon,
  TabsViewer,
} from "ui";
import {
  newsfeedPosts,
  SocialShopsPostCardPlaceholder,
  SocialServicePostCardPlaceholder,
  SocialActionsCardPlaceholder,
} from "ui/placeholder";
import { AffiliationCardsListWrapper } from "@blocks/Social/AffiliationPostListWrapper";
import { ActionsCardListWrapper } from "@blocks/Social/ActionsCardsListWrapper";
import { MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

export const HashtagPageView: React.FC = () => {
  const isBase = useMediaQuery({ maxWidth: 767 });

  const cols = isBase ? 3 : 3;
  const { t } = useTranslation();
  const router = useRouter();
  const tag = router.query.tag as string;

  const tabs: TabType[] = [
    {
      name: t("news_feed", "NEWSFEED"),
      component: <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />,
      outlineIcon: <NewsFeedOutlineIcon className="w-full h-full" />,
      solidIcon: <NewsFeedIcon className="w-full h-full" />,
    },
    {
      name: t("shop", "SHOP"),
      component: (
        <ShopCardsListWrapper
          cols={cols}
          items={SocialShopsPostCardPlaceholder}
        />
      ),
      outlineIcon: (
        <ShoppingCartOutlineIcon className=" text-black w-full h-full " />
      ),
      solidIcon: <ShoppingCartIcon className="w-full h-full" />,
    },
    {
      name: t("service", "SERVICE"),

      component: (
        <ServiceCardsListWrapper
          cols={cols}
          items={SocialServicePostCardPlaceholder}
        />
      ),
      outlineIcon: <ServicesOutlineIcon className="w-full h-full text-black" />,
      solidIcon: <ServicesIcon className="w-full h-full" />,
    },
    {
      name: t("affiliation", "AFFILIATION"),
      component: (
        <AffiliationCardsListWrapper cols={cols} posts={newsfeedPosts} />
      ),
      outlineIcon: (
        <AffiliationIconOutline className=" text-black w-full h-full " />
      ),
      solidIcon: <AffiliationIcon className="w-full h-full" />,
    },
    {
      name: t("actions", "ACTIONS"),
      component: (
        <ActionsCardListWrapper videos={SocialActionsCardPlaceholder} />
      ),
      outlineIcon: <MdOutlineVideoLibrary className="w-full h-full" />,
      solidIcon: <MdVideoLibrary className="w-full h-full" />,
    },
  ];
  const MostLikedPostData = newsfeedPosts.slice(0, 7);
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className="flex  md:w-5/12 w-10/12 mt-4 md:mt-0 justify-center md:justify-between items-center mb-6 ">
        <ShadcnText className="font-bold text-2xl">
          #{tag}
        </ShadcnText>
        <button className="hidden md:flex justify-center items-center bg-[#3CD399] text-white font-semibold rounded-full w-[140px] h-[50px]">
          Follow
        </button>
      </div>
      <div className="flex flex-col h-full md:w-10/12 w-11/12 justify-center ">
        <TabsViewer
          border="bottom"
          tabs={tabs}
          tabListProps={{
            className: "w-full md:w-9/12 flex justify-center mx-auto",
          }}
        >
          <div className="w-full md:h-[400px] h[220px] no-scrollbar flex gap-4 mb-8 overflow-x-scroll  ">
            {MostLikedPostData.map((post, i) => (
              <MostLikedPost image={post.postInfo.thumbnail || ""} key={i} />
            ))}
          </div>
        </TabsViewer>
      </div>
    </div>
  );
};
