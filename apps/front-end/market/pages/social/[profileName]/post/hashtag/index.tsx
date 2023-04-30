import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container, HashTagView } from "ui";
import { MasterLayout } from "@components";
import { useRouting } from "routing";

export interface HashTagPageProps {}

const hashTag: NextPage<HashTagPageProps> = () => {
  const { getParam } = useRouting();
  const tag = getParam("tag");
  return (
    <>
      <Head>
        <title>Wiaah | hashtag search results</title>
      </Head>
      <MasterLayout social>
        <Container>
          <HashTagView tag={tag} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default hashTag;
