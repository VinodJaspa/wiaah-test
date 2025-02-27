import Head from "next/head";
import { socialAffiliationCardPlaceholders } from "placeholder";
import React from "react";
import { SellerLayout, SocialAffiliationCard } from "ui";

const Affiliation: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Affiliation</title>
      </Head>
      <SellerLayout header="main">
        <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {socialAffiliationCardPlaceholders.map((post, i) => (
            <SocialAffiliationCard key={i} post={post} />
          ))}
        </div>
      </SellerLayout>
    </>
  );
};

export default Affiliation;
