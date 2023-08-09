import { NewPostView, SellerLayout } from "@UI";
import { NextPage } from "next";
import React from "react";

const NewPost: NextPage = () => {
  return (
    <SellerLayout>
      <div className="w-3/4 mx-auto">
        <NewPostView />
      </div>
    </SellerLayout>
  );
};

export default NewPost;
