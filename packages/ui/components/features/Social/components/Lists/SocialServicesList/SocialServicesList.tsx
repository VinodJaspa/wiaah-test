import { usePagination } from "hooks";
import { PostCardPlaceHolder, ShopCardsInfoPlaceholder } from "placeholder";
import React from "react";
import {
  useGetServicesPostsQuery,
  SpinnerFallback,
  PostViewPopup,
  SocialServiceDetailsCard,
  SocialServiceDetailsCardProps,
  GridListOrganiser,
  SocialServicesPostCard,
} from "ui";
import { randomNum } from "utils";

const servicesData = [
  {
    src: "https://cdn2.hubspot.net/hubfs/439788/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
    type: "Hotel",
  },
  {
    src: "https://media-cdn.tripadvisor.com/media/photo-s/1a/b8/46/6d/london-stock.jpg",
    type: "Restaurant",
  },
  {
    src: "https://www.brandeis.edu/health/images/homepage/reception.jpg",
    type: "Health Center",
  },
  {
    src: "https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg",
    type: "Beauty Center",
  },
  {
    src: "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/dealer-car-sales-0519.jpg?itok=psw3eEer",
    type: "Vehicle",
  },
  {
    src: "https://www.costablancadreams.eu/wp-content/uploads/2021/05/JUNE30-450x300.jpg",
    type: "Holiday Rentals",
  },
];

export interface SocialServicesPostsListProps {}

export const SocialServicePostsList: React.FC<
  SocialServicesPostsListProps
> = () => {
  const { take, page } = usePagination(16);
  const {
    data: res,
    isLoading,
    isError,
  } = useGetServicesPostsQuery({ take, page });

  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      <PostViewPopup<SocialServiceDetailsCardProps>
        //@ts-ignore
        fetcher={async ({ queryKey }: any) => {
          const id = queryKey[1].postId;
          const sentence =
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley";

          const post = ShopCardsInfoPlaceholder.find((post) => post.id === id);
          return {
            id: "123",
            label: "label",
            name: "service post",
            createdAt: new Date().toString(),
            attachements: [
              {
                src: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW1lcmljYW4lMjBob3VzZXN8ZW58MHx8MHx8&w=1000&q=80",
                type: "image",
              },
              { src: "/video.mp4", type: "video" },
            ],
            type: "hotel",
            content: sentence.substring(0, randomNum(sentence.length)),
            profileInfo: {
              accountType: "seller",
              id: "1263",
              name: "seller name",
              public: true,
              thumbnail: "/shop-2.jpeg",
              verified: true,
            },
            price: randomNum(123),
            rate: randomNum(159),
            views: randomNum(153),
            hashtags: ["fashion", "gaming"],
            cashback: { amount: 15, type: "cash" },
            discount: randomNum(20),
            postInteraction: {
              likes: randomNum(300),
              comments: randomNum(100),
            },
          };
        }}
        queryName="ServicePost"
        idParam="servicepostid"
        renderChild={(props) => {
          return (
            <SocialServiceDetailsCard
              showCommentInput={false}
              showInteraction={false}
              {...props}
            />
          );
        }}
      />

      {Array.isArray(res?.data) ? (
        <GridListOrganiser
          rowSize="14.5rem"
          presets={[
            {
              length: 6,
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
              length: 8,
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
              length: 9,
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
          {res?.data.map((post) => {
            const attachments = servicesData[randomNum(servicesData.length)];
            return (
              <SocialServicesPostCard
                profileInfo={{ ...PostCardPlaceHolder.profileInfo }}
                postInfo={{
                  ...PostCardPlaceHolder.postInfo,
                  attachments: [{ src: attachments.src, type: "image" }],
                }}
                cashback={10}
                discount={15}
                price={120}
                serviceLabel={attachments.type}
              />
            );
          })}
        </GridListOrganiser>
      ) : null}
    </SpinnerFallback>
  );
};
