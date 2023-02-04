import React, { useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import MasterLayout from "../components/MasterLayout";
import { Container, Divider, Spacer, Collaboration, products } from "ui";
import { WishlistView } from "../components/Wishlist/WishlistView";
import { useSetRecoilState } from "recoil";
import { SavedItemsState } from "@src/state";

export const getServerSideProps: GetServerSideProps = async () => {
  // get user wishlist and return it as props

  return {
    props: {},
  };
};

const wishlist: NextPage = () => {
  const setSavedItems = useSetRecoilState(SavedItemsState);
  useEffect(() => {
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
