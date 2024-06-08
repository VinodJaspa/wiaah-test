import Head from "next/head";
import React from "react";
import { Container, Divider, Spacer, Collaboration } from "ui";
import { CollaborationView } from "../../components/Collaboration/CollaborationView";
import MasterLayout from "../../components/MasterLayout";
import { CollaboratorsShops } from "ui/placeholder/collaboratorShops";

type CollaborationShopProps = {
  shopId: string;
};

const CollaborationShop: React.FC<CollaborationShopProps> = ({ shopId }) => {
  return (
    <>
      <Head>
        <title>Wiaah | Collaboration</title>
      </Head>
      <MasterLayout>
        <CollaborationView shopId={shopId} categories={CollaboratorsShops} />
        <Container>
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default CollaborationShop;
