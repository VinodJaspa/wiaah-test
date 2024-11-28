import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AffiliationOfferCardInfo } from "types";
import { Container } from "ui";
import { MasterLayout } from "@components";
import { AffiliationPostView } from "@components";
import { useRouter } from "next/router";

interface AffiliationPostPageProps {
  affiliationPost: AffiliationOfferCardInfo;
  otherPosts: AffiliationOfferCardInfo[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;

  return {
    props: {
      postId: postId || null,
    },
  };
};

const SocialShopPost: NextPage<AffiliationPostPageProps> = ({ }) => {
  const router = useRouter();
  const postId = router.query.postId as string;
  return (
    <>
      <Head>
        <title>Wiaah | social affiliation post</title>
      </Head>
      <MasterLayout social>
        <Container>
          <AffiliationPostView id={postId} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default SocialShopPost;
