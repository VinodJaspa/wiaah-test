import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { SellerLayout, useResponsive, HashTagView } from "ui";
import { dehydrate, QueryClient } from "react-query";
import { useRouting } from "routing";

interface HashtagPageProps {}
function getHashtags() {
  return [];
}
export const getServerSideProps: GetServerSideProps<
  HashtagPageProps
> = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery("hashtags", getHashtags);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const HashtagPage: NextPage<HashtagPageProps> = () => {
  const { isMobile } = useResponsive();
  const { getParam } = useRouting();
  const tag = getParam("tag");
  return (
    <>
      <Head>
        <title>seller | hashtags</title>
      </Head>
      <SellerLayout header={isMobile ? "minimal" : "main"}>
        <HashTagView tag={tag} />
      </SellerLayout>
    </>
  );
};

export default HashtagPage;
