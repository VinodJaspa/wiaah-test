'use client';

import { NextPage } from "next";
import React from "react";
import { LoginViewComman } from "@UI";
import { useRouter } from "next/router";

const Signin: NextPage = () => {
  const router = useRouter();
  const handleRoute = (view: string) => {
  window.location.href = "/auth/register";
    router.push(`/auth/register`);
  };
  return (
    <div className="h-screen">
      <LoginViewComman loginType="seller-signup" handleRoute={(view) => handleRoute(view)} />
    </div>
  );
};

export default Signin;
