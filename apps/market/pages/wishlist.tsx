import React, { useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import MasterLayout from "../components/MasterLayout";
import { Container, Divider, Spacer } from "ui";
import WishlistView from "../components/Wishlist/WishlistView";
import { Collaboration } from "ui/components/blocks/Collaboration";
import { products } from "ui/placeholder/products";
import { useSetRecoilState } from "recoil";
import { SavedItemsState } from "ui/state";

export const getServerSideProps: GetServerSideProps = async () => {
  // get user wishlist and return it as props

  return {
    props: {},
  };
};

const wishlist: NextPage = () => {
  const setSavedItems = useSetRecoilState(SavedItemsState);
  useEffect(() => {
    console.log("initial");
    setSavedItems(products);
  }, []);
  return (
    <>
      <Head>
        <title>WishList</title>
      </Head>
      <MasterLayout>
        <Container>
          <WishlistView />
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default wishlist;
