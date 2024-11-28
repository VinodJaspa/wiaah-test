import React from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { socialAffiliationCardPlaceholder } from "ui/placeholder";
import { AffiliationOfferCardInfo } from "types";
import { AffiliationOfferView, Container, SellerLayout } from "ui";
import { useRouter } from "next/router";
import { AffiliationPostView, MasterLayout } from "@components";

export interface affiliationOfferPageProps { }

async function getAffiliationOffer({
  queryKey,
}): Promise<AffiliationOfferCardInfo> {
  const offerId = queryKey[1].offerId;

  return socialAffiliationCardPlaceholder;
}

export const getServerSideProps: GetServerSideProps<
  affiliationOfferPageProps
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const offerId = query.offerId;

  queryClient.prefetchQuery(
    ["affiliationOffer", { offerId }],
    getAffiliationOffer,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const AffiliationOffer: NextPage<affiliationOfferPageProps> = () => {
  const router = useRouter();
  const offerId = router.query.offerId as string;
  return (
    <>
      <Head>
        <title>Market | Affiliation Post</title>
      </Head>
      <>
        <MasterLayout social>
          <Container>
            <AffiliationPostView id={offerId} />
          </Container>
        </MasterLayout>
      </>
    </>
  );
};

export default AffiliationOffer;
