import React from "react";
import { useRouting } from "routing";
import {
  ResturantSearchInput,
  ResturantSearchList,
  ServicesRequestKeys,
  getRandomImage,
} from "ui";
import { randomNum } from "utils";

export const ResturantSearchView: React.FC = () => {
  const { visit } = useRouting();
  return (
    <div className="flex flex-col gap-8">
      <div className="md:w-3/4 w-full mx-auto">
        <ResturantSearchInput
          onSubmit={() =>
            visit((routes) =>
              routes.visitServiceLocationSearchResults(
                ServicesRequestKeys.resturants,
                "location"
              )
            )
          }
        />
      </div>

      <ResturantSearchList
        restaurants={[...Array(20)].map(() => ({
          hashtags: [],
          location: {
            address: "address",
            city: "city",
            country: "country",
          },
          price: randomNum(150),
          rating: randomNum(5),
          reviews: randomNum(200),
          thumbnail:
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/8e/55/e6/variety-of-choices.jpg",
          title: "Dish name",
        }))}
      />
    </div>
  );
};
