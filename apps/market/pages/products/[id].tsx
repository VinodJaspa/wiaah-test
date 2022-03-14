import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ProductView } from "ui/views";
import MasterLayout from "../../components/MasterLayout";
import { Container } from "ui";
import { useRouter } from "next/router";

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // get product details from api
  return (
    <>
      <Head>
        <title>Wiaah | Product</title>
      </Head>
      <MasterLayout>
        <Container>
          <ProductView />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  // get product details by its id and return it to the page as props
  return {
    props: {},
  };
};
