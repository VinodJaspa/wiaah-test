import React from "react";
import { NextPage } from "next";
import { AccountSignup } from "@UI";

const Signin: NextPage = () => {
  return (
    <div className="h-screen">
      <AccountSignup onSuccess={() => { }} />
    </div>
  );
};

export default Signin;
