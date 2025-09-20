import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerLayout } from "ui";
import SocialNewsfeedView from "@features/Social/views/SocialNewsfeedView";
import { useAccountType } from "hooks";
import { AccountType } from "types";

const Buyer: NextPage = () => {
 const { setAccountType } = useAccountType();
      setAccountType(AccountType.Buyer);
  return (
    <>
      <Head>
        <title>Wiaah | Buyer</title>
      </Head>
      <SellerLayout header="main" accountType="buyer" type={"test"}>
        <SocialNewsfeedView isHome/>
      </SellerLayout>
    </>
  );
};

export default Buyer;
