
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Container, Spacer, Collaboration, TermsAndConditions } from "ui";
import MasterLayout from "../components/MasterLayout";
// Divider component using Tailwind CSS (Shadcn styling)
const Divider = ({ className = "", children }: { className?: string, children?: React.ReactNode }) => {
  return (
    <div className={`my-4 border-t border-gray-300 ${className}`}>
      {children && (
        <span className="absolute -translate-x-1/2 left-1/2 px-2 bg-white text-sm text-gray-500">
          {children}
        </span>
      )}
    </div>
  );
};



const termsAndConditions: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Wiaah</title>
      </Head>
      <MasterLayout>
        <Container>
          <TermsAndConditions />
          <Spacer spaceInRem={2} />
          <Divider />
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default termsAndConditions;
