import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps } from "types";
import {
  SellerLayout,
  ServiceCardsListWrapper,
  SocialServicePostCardPlaceholder,
} from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async () => {
  const queryclient = new QueryClient();

  queryclient.prefetchQuery("", () => {});

  return {
    props: {
      dehydratedState: dehydrate(queryclient),
    },
  };
};

const ServicesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>services</title>
      </Head>
      <SellerLayout>
        <div className="flex justify-center w-full h-fit">
          <div className="md:w-8/12 w-11/12">
            <ServiceCardsListWrapper
              cols={3}
              items={SocialServicePostCardPlaceholder}
            />
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default ServicesPage;
