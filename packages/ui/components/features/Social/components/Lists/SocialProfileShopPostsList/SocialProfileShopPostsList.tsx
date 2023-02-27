import { FilterModal, GridListOrganiser, usePaginationControls } from "@blocks";
import { useGetProfileShopPosts } from "@features/Social/services";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ScrollPaginationWrapper,
} from "@partials";
import React from "react";
import { SocialShopPostcard } from "@features/Social/components/Cards";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTypedReactPubsub } from "@libs";
import { useResponsive } from "@UI/../hooks";

export const SocialProfileShopPostsList: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { controls, pagination } = usePaginationControls();
  const { data: items } = useGetProfileShopPosts({
    pagination,
    authorId: userId,
  });
  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const { emit } = useTypedReactPubsub(
    (events) => events.openSocialShopPostsFilterDrawer
  );

  const { isMobile, isTablet } = useResponsive();

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
          rowSize={isMobile ? "6rem" : isTablet ? "10rem" : "14.5rem"}
          presets={
            isMobile
              ? [
                  {
                    cols: 3,
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
                        r: 1,
                      },
                      {
                        c: 2,
                        r: 2,
                      },
                      {
                        c: 2,
                        r: 1,
                      },
                    ],
                  },
                  {
                    cols: 3,
                    points: [
                      { c: 2, r: 2 },
                      { c: 1, r: 1 },
                      { c: 1, r: 1 },
                      { c: 2, r: 1 },
                      { c: 1, r: 1 },
                      { c: 2, r: 1 },
                      { c: 1, r: 1 },
                    ],
                  },

                  {
                    cols: 2,
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
                ]
              : [
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
                ]
          }
        >
          {items?.map((shop, i) => (
            <SocialShopPostcard
              key={i}
              postInfo={{
                createdAt: new Date().toString(),
                id: shop.id,
                comments: shop.comments,
                reactionNum: shop.reactionNum,
                shares: shop.shares,
                product: shop.product,
                userId: shop.user?.id,
              }}
              profileInfo={shop.user?.profile!}
            />
          )) || null}
        </GridListOrganiser>
      </div>
    </ScrollPaginationWrapper>
  );
};
