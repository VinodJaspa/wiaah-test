import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AffiliationOffersCardListWrapper,
  ScrollPaginationWrapper,
  useGetAffiliationPostsSuggestions,
  usePaginationControls,
} from "ui";
import { useBreakpointValue } from "utils";
import { SocialProfileInfo } from "placeholder";
import { AffiliationStatus } from "@features/API";
import { SocialAffiliationCardProps } from "ui";

export const AffiliationView: React.FC = () => {
  const router = useRouter();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { pagination, controls } = usePaginationControls();
  // use this graphql endpoint if the server is ready if not use placholder data
  // const { data } = useGetAffiliationPostsSuggestions({
  //   pagination,
  // });

  const data = useState();

  return (
    <ScrollPaginationWrapper controls={controls}>
      <AffiliationOffersCardListWrapper
        cols={cols}
        items={AffiliationPostSuggestionsPlaceholder}
      />
    </ScrollPaginationWrapper>
  );
};

const AffiliationPostSuggestionsPlaceholder: SocialAffiliationCardProps["post"][] =
  [
    {
      id: "post1",
      userId: "user1",
      affiliationId: "aff1",
      views: 1000,
      reactionNum: 150,
      shares: 20,
      comments: 30,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff1",
        commision: 10,
        createdAt: new Date().toISOString(),
        itemId: "item1",
        itemType: "product",
        //@ts-ignore
        product: "Product 1",
        //@ts-ignore
        service: "Service 1",
        status: AffiliationStatus.Active,
      },
      user: {
        profile: {
          id: "user1",
          username: "john_doe",
          verified: true,
          photo: "https://example.com/photo1.jpg",
          ownerId: "owner1",
        },
      },
    },
    {
      id: "post2",
      userId: "user2",
      affiliationId: "aff2",
      views: 2000,
      reactionNum: 250,
      shares: 30,
      comments: 40,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff2",
        commision: 15,
        createdAt: new Date().toISOString(),
        itemId: "item2",
        itemType: "service",
        //@ts-ignore
        product: "Product 2",
        //@ts-ignore
        service: "Service 2",
        status: AffiliationStatus.InActive,
      },
      user: {
        profile: {
          id: "user2",
          username: "jane_smith",
          verified: false,
          photo: "https://example.com/photo2.jpg",
          ownerId: "owner2",
        },
      },
    },
    {
      id: "post3",
      userId: "user3",
      affiliationId: "aff3",
      views: 3000,
      reactionNum: 350,
      shares: 40,
      comments: 50,
      createdAt: new Date().toISOString(),
      affiliation: {
        id: "aff3",
        commision: 20,
        createdAt: new Date().toISOString(),
        itemId: "item3",
        itemType: "product",
        //@ts-ignore
        product: "Product 3",
        //@ts-ignore
        service: "Service 3",
        status: AffiliationStatus.Active,
      },
      user: {
        profile: {
          id: "user3",
          username: "sam_wilson",
          verified: true,
          photo: "https://example.com/photo3.jpg",
          ownerId: "owner3",
        },
      },
    },
  ];
