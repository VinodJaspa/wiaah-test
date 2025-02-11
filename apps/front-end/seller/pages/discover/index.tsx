import { useResponsive } from "hooks";
import { NextPage } from "next";
import Head from "next/head";
import { DiscoverView, SellerLayout } from "ui";

interface DiscoverPageProps {}

const Discover: NextPage<DiscoverPageProps> = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Head>
        <title>Wiaah | Discover</title>
      </Head>
      <SellerLayout>
        <DiscoverView />
      </SellerLayout>
    </>
  );
};

export default Discover;
