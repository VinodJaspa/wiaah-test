import Head from "next/head";
import { socialAffiliationCardPlaceholders } from "placeholder";
import React from "react";
import { ListWrapper, SellerLayout, SocialAffiliationCard } from "ui";

const Affiliation: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Affiliation</title>
      </Head>
      <SellerLayout header="main">
        <div className="flex justify-center w-11/12 pr-12  h-full">
          <ListWrapper cols={4}>
            {socialAffiliationCardPlaceholders.map((post, i) => (
              <SocialAffiliationCard key={i} post={post} />
            ))}
          </ListWrapper>
        </div>
      </SellerLayout>
    </>
  );
};

export default Affiliation;
