
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
  const { t } = useTranslation();
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLg = useMediaQuery({ minWidth: 1024 });

  const isBase = useMediaQuery({ maxWidth: 767 });

  const router = useRouter();
  const tag = router.query.tag as string;
  const cols = isBase ? 1 : isMd ? 2 : isLg ? 3 : 1;
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
            className: "w-full m-4 pl-3 flex justify-center mx-auto",
          }}
        >
          <div className="w-full overflow-x-auto no-scrollbar flex gap-x-4 scroll-snap-x snap-mandatory px-4 mb-2">
            {MostLikedPostData.map((post, i) => (
              <div key={i} className="snap-start shrink-0">
                <MostLikedPost image={post.postInfo.thumbnail || ""} />
              </div>
            ))}
          </div>


        </TabsViewer>
      </div>
    </div>
  );
};
