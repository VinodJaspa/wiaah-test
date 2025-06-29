import React from "react";
import { NextPage } from "next";
import { SellerSigninView } from "ui";

const Signin: NextPage = () => {
  return (
    <div className="h-screen">
      <SellerSigninView onNavigate={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
};

export default Signin;
