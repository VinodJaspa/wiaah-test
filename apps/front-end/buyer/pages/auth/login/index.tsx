import React from "react";
import { NextPage } from "next";
import { SellerSigninView } from "ui";

const Signin: NextPage = () => {
  return (
    <div className="h-screen">
      <SellerSigninView />
    </div>
  );
};

export default Signin;
