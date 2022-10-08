import Head from "next/head";
import React from "react";
import { Container, Divider, Spacer, Collaboration } from "ui";
import { CollaborationView } from "../../components/Collaboration/CollaborationView";
import MasterLayout from "../../components/MasterLayout";
import { Shop } from "../../components/Shop/ShopProfile";
import { CollaboratorsShops } from "ui/placeholder/collaboratorShops";

const shop: Shop = {
  shopDetails: "wiaah shop detials",
  shopLocation: {
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/512px-Flag_of_Switzerland.svg.png",
    location: "Switzerland, Geneva",
  },
  verified: true,
  shopName: "Wiaah",
  shopRating: 5,
  shopSince: new Date().toLocaleDateString(),
  shopThumbnailUrl: "/shop-3.jpeg",
};

const CollaborationShop: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Collaboration</title>
      </Head>
      <MasterLayout>
        <CollaborationView shop={shop} categories={CollaboratorsShops} />
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
