import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AddNewService } from "ui";

const EditProduct: NextPage = () => {
  const { query } = useRouter();

  const prodId = query["id"];

  return (
    <section className="py-4">
      <AddNewService />
    </section>
  );
};

export default EditProduct;
