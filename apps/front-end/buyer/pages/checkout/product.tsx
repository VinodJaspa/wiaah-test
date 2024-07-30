import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { AddressCardDetails } from "types";
import { CartSummaryItem } from "types";
import { Collaboration, Container, SellerLayout, Spacer } from "ui";
import {
  CheckoutProductsState,
  UserAddressesState,
  VoucherState,
} from "@src/state";
import { CheckoutCart } from "types";
import { CheckoutView } from "ui";

interface CheckoutPageProps {
  userAddresses: AddressCardDetails[];
  cart: CheckoutCart;
}

export const getServerSideProps: GetServerSideProps<
  CheckoutPageProps
> = async () => {
  // get user address call
  const userAddresses: AddressCardDetails[] = [
    {
      id: "1",
      firstName: "john",
      lastName: "doe",
      address: "123 street",
      address2: "321 street",
      city: "new york",
      country: "united states",
      zipCode: 123456,
      contact: "+123456789",
    },
    {
      id: "2",
      firstName: "john",
      lastName: "doe",
      address: "123 street",
      address2: "321 street",
      city: "new york",
      country: "united states",
      zipCode: 123456,
      contact: "+123456789",
    },
  ];
  // get current shopping cart items
  const products: CartSummaryItem[] = [];
  return {
    props: {
      userAddresses,
      cart: {
        products,
      },
    },
  };
};

const Checkout: NextPage<CheckoutPageProps> = ({ userAddresses, cart }) => {
  const setCheckoutAddress = useSetRecoilState(UserAddressesState);
  const setVoucher = useSetRecoilState(VoucherState);
  const setProducts = useSetRecoilState(CheckoutProductsState);
  useEffect(() => {
    setProducts(cart.products);
    setCheckoutAddress(userAddresses);
    setVoucher(cart.voucher);
  }, []);

  return (
    <>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <SellerLayout>
        <div className="bg-[#F3F3F3]">
          <Container>
            <CheckoutView />
            <Spacer spaceInRem={4} />
          </Container>
        </div>
        <Container>
          <Collaboration />
        </Container>
      </SellerLayout>
    </>
  );
};

export default Checkout;
