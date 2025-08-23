'use client';
import React from "react";
import { NextPage } from "next";

import { Signup } from "@UI";
import { useRouter } from "next/router";

const Signin: NextPage = () => {
  const router = useRouter();
  console.log(router)
  const handleRoute = (view) => {


    window.location.href = `/auth/${view}`
    router.replace(`/auth/${view}`)
  }

  
  return (
    <div className="h-screen">
      <Signup loginType="login" handleRoute ={(view)=>handleRoute(view)} />
    </div>
  );
};

export default Signin;
