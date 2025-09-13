'use client';

import React from "react";
import { NextPage } from "next";

import { useRouter } from "next/router";
import { LoginViewComman, SigninView } from "@UI";

const Signin: NextPage = () => {
  const router = useRouter();

  const handleRoute = (view: string) => {
    window.location.href = "/auth/register";
    router.replace(`/auth/register`);
  };
  return (
    <div className="h-screen">
      <LoginViewComman loginType="seller-signup" handleRoute={(view) => handleRoute(view)} />
    </div>
  );
};

export default Signin;
