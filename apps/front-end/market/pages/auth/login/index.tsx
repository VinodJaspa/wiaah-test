'use client';

import React from "react";
import { NextPage } from "next";

import { useRouter } from "next/router";
import { SigninView, Signup } from "@UI";

const Signin: NextPage = () => {
  const router = useRouter();

  const handleRoute = () => {

    window.location.href = "/auth/register"
    router.push("/auth/register")
  }
  return (
    <div className="h-screen">
      <Signup loginType="login" />
    </div>
  );
};

export default Signin;
