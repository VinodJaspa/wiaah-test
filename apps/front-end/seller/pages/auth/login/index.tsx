'use client';

import React from "react";
import { NextPage } from "next";

import { useRouter } from "next/router";
import { SigninView } from "@UI";

const Signin: NextPage = () => {
  const router = useRouter();

  const handleRoute = () => {
    window.location.href = "/auth/register"
    router.push("/auth/register")
  }
  return (
    <div className="h-screen">
      <SigninView onNavigate={handleRoute} />
    </div>
  );
};

export default Signin;
