import React from "react";
import {
  AspectRatio,
  GridListOrganiser,
  Image,
  SocialServicesPostCard,
  SocialServicesPostCardProps,
  useResponsive,
} from "@UI";
import { mapArray } from "@UI/../utils/src";

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

type ServicePostData = {
  thumbnail: string;
  id: string;
};

export interface SocialServicesPostsListProps {
  posts: ServicePostData[];
  grid?: boolean;
}

export const SocialServicePostsList: React.FC<SocialServicesPostsListProps> = ({
  grid = false,
  posts,
}) => {
  const { isMobile } = useResponsive();
  return (
    <>
      {Array.isArray(posts) ? (
        isMobile ? (
          <div className="grid grid-cols-3 gap-[1px]">
            {mapArray(posts, (v, i) => (
              <AspectRatio ratio={1}>
                <Image
                  src={v.thumbnail}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
            ))}
          </div>
        ) : (
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
                cols: 5,
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
                    c: 1,
                    r: 2,
                  },
                  {
                    c: 1,
                    r: 1,
                  },
                  {
                    c: 2,
                    r: 1,
                  },
                  {
                    c: 1,
                    r: 1,
                  },
                ],
              },
            ]}
          >
            {posts.map((post) => {
              return <SocialServicesPostCard {...post} />;
            })}
          </GridListOrganiser>
        )
      ) : null}
    </>
  );
};
