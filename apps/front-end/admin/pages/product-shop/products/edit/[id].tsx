import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AddNewProductSection } from "ui";

const EditProduct: NextPage = () => {
  const { query } = useRouter();

  const prodId = query["id"];

  return (
    <section>
      <AddNewProductSection />
    </section>
  );
};

export default EditProduct;
