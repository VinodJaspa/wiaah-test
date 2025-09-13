'use client';
import React from "react";
import { NextPage } from "next";
import {  LoginViewComman } from "@UI";
import { useRouter } from "next/router";
import Link from "next/link";

const Signin: NextPage = () => {
  const router = useRouter();

  const handleRoute = (view: string) => {
    router.replace(`/auth/${view}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4">
      <LoginViewComman loginType="buyer-signup" handleRoute={(view) => handleRoute(view)} />
    </div>
  );
};

export default Signin;
