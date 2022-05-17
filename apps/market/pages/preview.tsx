import React from "react";
import { NextPage } from "next";
import { ProductGeneralDetails } from "ui";
import { PostCardPlaceHolder } from "ui/placeholder";

const preview: NextPage = () => {
  return (
    <section className="w-full overflow-scroll h-screen">
      <div className="w-1/2 h-full m-auto">
        <ProductGeneralDetails {...PostCardPlaceHolder} />
      </div>
    </section>
  );
};

export default preview;
