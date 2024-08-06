import { GridListOrganiser, usePaginationControls } from "@blocks";
import {
  GetProfileShopPostsQuery,
  useGetProfileShopPosts,
} from "@features/Social/services";
import { Image, ScrollPaginationWrapper } from "@partials";
import React from "react";
import { useResponsive } from "@UI/../hooks";
import {
  AccountType,
  CashbackType,
  PostVisibility,
  PresentationType,
  ProfileVisibility,
} from "@features/API";
import { getRandomImage } from "@UI/placeholder";

export const SocialProfileShopPostsList: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { controls, pagination } = usePaginationControls();
  const { data: _items } = useGetProfileShopPosts({
    pagination,
    authorId: userId,
  });
  const items = FAKE_ITEMS;

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

const FAKE_ITEMS: GetProfileShopPostsQuery["getUserProductPosts"] = [
  {
    __typename: "ProductPost",
    id: "post-001",
    visibility: PostVisibility.Public,
    shares: 10,
    comments: 5,
    reactionNum: 20,
    productId: "product-001",
    views: 100,
    product: {
      __typename: "Product",
      id: "product-001",
      presentations: [
        {
          src: getRandomImage(),
          type: PresentationType.Image, // Adjust this based on the actual PresentationType values
        },
      ],

      hashtags: ["#example", "#test"],
      title: "Sample Product 1",
      cashback: {
        __typename: "Cashback",
        amount: 10,
        id: "cashback-001",
        type: CashbackType.Cash, // Adjust this based on the actual CashbackType values
        units: 5,
      },
      discount: {
        __typename: "Discount",
        amount: 20,
        id: "discount-001",
        units: 3,
      },

      price: 50,
      thumbnail: "http://example.com/product1-thumbnail.jpg",
    },
    user: {
      __typename: "Account",
      id: "user-001",
      accountType: AccountType.Seller,
      profile: {
        __typename: "Profile",
        photo: "http://example.com/user1-photo.jpg",
        username: "user1",
        verified: true,
        id: "profile-001",
        profession: "Photographer",
        visibility: ProfileVisibility.Public,
      },
    },
  },
];
