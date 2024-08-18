import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { SellerLayout } from "ui";
import { ActionsCardListWrapper } from "@blocks/Social/ActionsCardsListWrapper";
import { SocialActionsCardPlaceholder } from "ui/placeholder/social";

const ActionsPage: NextPage = () => {
  return (
    <>
      <Head>Wiaah | Market Actions</Head>
      <SellerLayout>
        <div className="flex justify-center w-full h-fit">
          <div className="md:w-8/12 w-11/12">
            <ActionsCardListWrapper
              videos={SocialActionsCardPlaceholder}
              popup={false}
            />
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default ActionsPage;
