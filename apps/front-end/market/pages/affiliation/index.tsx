import Head from "next/head";
import { newsfeedPosts } from "placeholder";
import React from "react";
import { SellerLayout } from "ui";
import { AffiliationCardsListWrapper } from "ui/components/blocks/Social/AffiliationPostListWrapper";

const affiliation: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wiaah | affiliation</title>
      </Head>
      <SellerLayout header="main">
        <div className="flex justify-center w-full h-fit">
          <div className="md:w-8/12 w-11/12">
            <AffiliationCardsListWrapper
              cols={3}
              posts={newsfeedPosts}
              popup={false}
            />
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default affiliation;
