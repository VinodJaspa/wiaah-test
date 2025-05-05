import React from "react";

import { NextPage } from "next";
import { SellerLayout } from "@blocks";
import Head from "next/head";

import { ScrollableStories, NewsFeedGrid, ShandcnVStack } from "ui";
import { imagesPlaceholder, storiesPlaceholder } from "placeholder";

const NewsFeed: NextPage = () => {
  return (
    <>
      <Head>
        <title>Buyer | Newsfeed</title>
      </Head>
      <SellerLayout>
        <ShandcnVStack className="md:w-11/12 w-full md:mx-0 mx-3 gap-4">
          <ScrollableStories stories={storiesPlaceholder} />
          <NewsFeedGrid images={imagesPlaceholder} />
        </ShandcnVStack>
      </SellerLayout>
    </>
  );
};

export default NewsFeed;
