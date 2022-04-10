import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const socialShop: NextPage = () => {
  const router = useRouter();
  return <div>{router.query.postId}</div>;
};

export default socialShop;
