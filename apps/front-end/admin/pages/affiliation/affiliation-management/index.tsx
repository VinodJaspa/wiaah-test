import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { Table, TBody, Th, THead, Tr } from "ui";
import { randomNum } from "utils";

type Affiliation = {
  id: string;
  sellerId: string;
  sellerName: string;
  affiliationLink: string;
  createdAt: string;
  commision: number;
  product: {
    thumbnail: string;
    price: number;
    id: string;
  };
};

const affiliations: Affiliation[] = [...Array(10)].map((_, i) => ({
  id: randomNum(165464).toString(),
  affiliationLink: `test link ${i}`,
  commision: randomNum(15),
  sellerId: i.toString(),
  sellerName: `seller name ${i}`,
  createdAt: new Date().toString(),
  product: {
    id: i.toString(),
    price: randomNum(150),
    thumbnail: getRandomImage(),
  },
}));

const AffiliationManagement: NextPage = () => {
  const { t } = useTranslation();
  return (
    <section>
      <Table>
        <THead>
          <Tr>
            <Th>{t("Photo")}</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </THead>
        <TBody></TBody>
      </Table>
    </section>
  );
};

export default AffiliationManagement;
