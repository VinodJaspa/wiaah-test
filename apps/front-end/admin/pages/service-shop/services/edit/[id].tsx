import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AddNewService } from "ui";
import Head from "next/head";

const EditProduct: NextPage = () => {
  const { query } = useRouter();

  const prodId = query["id"];

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Edit Services Form</title>
      </Head>
      <section className="py-4">
        <AddNewService />
      </section>
    </React.Fragment>
  );
};

export default EditProduct;
