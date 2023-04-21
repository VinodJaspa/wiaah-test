import { GridListOrganiser, usePaginationControls } from "@blocks";
import { useGetProfileShopPosts } from "@features/Social/services";
import { Image, ScrollPaginationWrapper } from "@partials";
import React from "react";
import { useResponsive } from "@UI/../hooks";

export const SocialProfileShopPostsList: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { controls, pagination } = usePaginationControls();
  const { data: items } = useGetProfileShopPosts({
    pagination,
    authorId: userId,
  });

  const { isMobile, isTablet } = useResponsive();

  return (
    <ScrollPaginationWrapper controls={controls}>
      {/* <div className="flex flex-col gap-4">
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
        <FilterModal /> */}

      <GridListOrganiser
        rowSize={isMobile ? "5rem" : isTablet ? "10rem" : "14.5rem"}
        gap={0.1}
        presets={
          // isMobile
          // ?
          [
            {
              cols: 5,
              points: [
                {
                  c: 3,
                  r: 2,
                },
                {
                  c: 2,
                  r: 3,
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
            // {
            //   cols: 3,
            //   points: [
            //     { c: 2, r: 2 },
            //     { c: 1, r: 1 },
            //     { c: 1, r: 1 },
            //     { c: 2, r: 1 },
            //     { c: 1, r: 1 },
            //     { c: 2, r: 1 },
            //     { c: 1, r: 1 },
            //   ],
            // },

            // {
            //   cols: 2,
            //   points: [
            //     {
            //       c: 2,
            //       r: 1,
            //     },
            //     {
            //       c: 2,
            //       r: 2,
            //     },
            //     {
            //       c: 1,
            //       r: 2,
            //     },
            //     {
            //       c: 1,
            //       r: 2,
            //     },
            //     {
            //       c: 1,
            //       r: 1,
            //     },
            //     {
            //       c: 1,
            //       r: 1,
            //     },
            //     {
            //       c: 1,
            //       r: 1,
            //     },
            //     {
            //       c: 1,
            //       r: 1,
            //     },
            //     {
            //       c: 2,
            //       r: 1,
            //     },
            //   ],
            // },
          ]
          // : [
          //     {
          //       cols: 5,
          //       points: [
          //         {
          //           c: 2,
          //           r: 2,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //         {
          //           c: 1,
          //           r: 2,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //       ],
          //     },
          //     {
          //       cols: 5,
          //       points: [
          //         { c: 1, r: 1 },
          //         { c: 1, r: 1 },
          //         { c: 1, r: 1 },
          //         { c: 1, r: 1 },
          //         { c: 1, r: 2 },
          //         { c: 2, r: 1 },
          //         { c: 1, r: 1 },
          //         { c: 1, r: 1 },
          //       ],
          //     },

          //     {
          //       cols: 4,
          //       points: [
          //         {
          //           c: 2,
          //           r: 1,
          //         },
          //         {
          //           c: 2,
          //           r: 2,
          //         },
          //         {
          //           c: 1,
          //           r: 2,
          //         },
          //         {
          //           c: 1,
          //           r: 2,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //         {
          //           c: 1,
          //           r: 1,
          //         },
          //         {
          //           c: 2,
          //           r: 1,
          //         },
          //       ],
          //     },
          //   ]
        }
      >
        {items?.map((prod, i) => (
          // <AspectRatio className="bg-gray-200" ratio={1}>
          <Image
            className="w-full h-full object-cover"
            src={prod?.product?.thumbnail || ""}
          />
          // </AspectRatio>
        )) || null}
      </GridListOrganiser>
      {/* </div> */}
    </ScrollPaginationWrapper>
  );
};
