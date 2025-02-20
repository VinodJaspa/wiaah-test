import { NextPage } from "next";
import Head from "next/head";
import { CheckoutView, Container, SellerLayout } from "ui";

const ServiceCheckout: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <SellerLayout>
        <Container>
          <CheckoutView />
        </Container>
      </SellerLayout>
    </>
  );
};

export default ServiceCheckout;
