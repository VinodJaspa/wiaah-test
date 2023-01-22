import { FilterModal, GridListOrganiser, usePaginationControls } from "@blocks";
import {
  ProfileVisibility,
  useGetProfileShopPosts,
} from "@features/Social/services";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ScrollPaginationWrapper,
} from "@partials";
import React from "react";
import { SocialShopPostcard } from "@features/Social/components/Cards";
import { useRouting } from "routing";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { AccountType } from "@features/Accounts";
import { useTypedReactPubsub } from "@libs";

export const SocialProfileShopPostsList: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { controls, pagination } = usePaginationControls();
  const { data: items } = useGetProfileShopPosts({
    pagination,
    authorId: userId,
  });
  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
  const { visit } = useRouting();
  const { t } = useTranslation();
  const { emit } = useTypedReactPubsub(
    (events) => events.openSocialShopPostsFilterDrawer
  );

  return (
    <ScrollPaginationWrapper controls={controls}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Menu>
            <MenuButton>
              <div
                onClick={() => emit()}
                className="mr-2 cursor-pointer flex items-center justify-between rounded-lg border p-2 text-xs"
              >
                <samp>{t("Sort")}</samp>
                <FaChevronDown className="ml-2" />
              </div>
            </MenuButton>
            <MenuList className="left-[0px]" origin="top left">
              <MenuItem>{t("Newest in")}</MenuItem>
              <MenuItem>{t("Price (Low to High)")}</MenuItem>
              <MenuItem>{t("Price (High to Low)")}</MenuItem>
            </MenuList>
          </Menu>
          <div
            onClick={() => emit()}
            className="mr-2 cursor-pointer flex items-center justify-between rounded-lg border p-2 text-xs"
          >
            <samp>{t("Filter")}</samp>
            <FaChevronDown className="ml-2" />
          </div>
        </div>
        <FilterModal />

        <GridListOrganiser
          rowSize="14.5rem"
          presets={[
            {
              cols: 5,
              points: [
                {
                  c: 2,
                  r: 2,
                },
                {
                  c: 1,
                  r: 1,
                },
                {
                  c: 1,
                  r: 2,
                },
                {
                  c: 1,
                  r: 1,
                },
                {
                  c: 1,
                  r: 1,
                },
                {
                  c: 1,
                  r: 1,
                },
              ],
            },
            {
              cols: 5,
              points: [
                { c: 1, r: 1 },
                { c: 1, r: 1 },
                { c: 1, r: 1 },
                { c: 1, r: 1 },
                { c: 1, r: 2 },
                { c: 2, r: 1 },
                { c: 1, r: 1 },
                { c: 1, r: 1 },
              ],
            },

            {
              cols: 4,
              points: [
                {
                  c: 2,
                  r: 1,
                },
                {
                  c: 2,
                  r: 2,
                },
                {
                  c: 1,
                  r: 2,
                },
                {
                  c: 1,
                  r: 2,
                },
                {
                  c: 1,
                  r: 1,
                },
                {
                  c: 1,
                  r: 1,
                },
                {
                  c: 1,
                  r: 1,
                },
                {
                  c: 1,
                  r: 1,
                },
                {
                  c: 2,
                  r: 1,
                },
              ],
            },
          ]}
        >
          {items?.map((shop, i) => (
            <SocialShopPostcard
              onCardClick={() =>
                visit((routes) => routes.addQuery({ shopPostId: shop.id }))
              }
              showComments
              key={i}
              postInfo={{
                createdAt: new Date().toString(),
                id: shop.id,
                numberOfComments: shop.comments,
                numberOfLikes: shop.reactionNum,
                numberOfShares: shop.shares,
                tags: shop.product.hashtags,
                attachments: shop.product.presentations,
                comments: [],
                content: "",
                views: shop.views,
              }}
              cashback={5}
              price={150}
              discount={10}
              profileInfo={{
                id: shop.user?.profile?.id || "",
                name: shop.user?.profile?.username || "",
                accountType: shop.user?.type || AccountType.Buyer,
                profession: shop.user?.profile?.profession || "",
                public:
                  shop.user?.profile?.visibility === ProfileVisibility.Public,
                thumbnail: shop.user?.profile?.photo || "",
                verifed: shop.user?.profile?.verified,
              }}
            />
          )) || null}
        </GridListOrganiser>
      </div>
    </ScrollPaginationWrapper>
  );
};
