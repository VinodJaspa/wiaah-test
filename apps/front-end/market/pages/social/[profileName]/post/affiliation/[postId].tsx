import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AffiliationOfferCardInfo } from "types";
import { Container } from "ui";
import { MasterLayout } from "@components";
import { AffiliationPostView } from "@components";
import { useRouting } from "routing";

interface AffiliationPostPageProps {
  affiliationPost: AffiliationOfferCardInfo;
  otherPosts: AffiliationOfferCardInfo[];
}

const socialShopPost: NextPage<AffiliationPostPageProps> = ({}) => {
  const { getParam } = useRouting();

  const id = getParam("postId");
  return (
    <>
      <Head>
        <title>Wiaah | social affiliation post</title>
      </Head>
      <MasterLayout social>
        <Container>
          <AffiliationPostView id={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default socialShopPost;
