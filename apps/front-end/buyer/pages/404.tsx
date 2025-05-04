import { SellerLayout } from "ui";
import React from 'react';

export default function Custom404() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl">404</h1>
      <div className="mx-12 h-12 w-px bg-gray-500"></div>
      <h2 className="text-lg">This page could not be found.</h2>
    </div>
  );
}
