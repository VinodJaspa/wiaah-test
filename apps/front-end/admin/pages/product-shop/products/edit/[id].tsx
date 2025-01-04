import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AddNewProductSection } from "ui";
import Head from "next/head";

const EditProduct: NextPage = () => {
  const { query } = useRouter();

  const prodId = query["id"];

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Edit Products Form</title>
      </Head>
      <section>
        <AddNewProductSection />
      </section>
    </React.Fragment>
  );
};

export default EditProduct;
