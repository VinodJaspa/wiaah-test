'use client';

import React from "react";
import { NextPage } from "next";
import { SellerSigninView } from "ui";
import { useRouter } from "next/router";

const Signin: NextPage = () => {
  const router = useRouter();

  const handleRoute = () => {

    window.location.href = "/auth/register"
    router.push("/auth/register")
  }
  return (
    <div className="h-screen">
      <SellerSigninView onNavigate={handleRoute} />
    </div>
  );
};

export default Signin;
