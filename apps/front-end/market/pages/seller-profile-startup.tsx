import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerProfileStartupView, Container } from "ui";

const SignUpFinalisation: NextPage = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isFormSubmitting, setFormSubmitting] = React.useState(false);

  return (
    <>
      <Head>
        <title>Wiaah | Signup Finalisation</title>
      </Head>
      <main className="block w-full grow h-screen">
        <Container>
          <SellerProfileStartupView
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isFormSubmitting={isFormSubmitting}
            setFormSubmitting={setFormSubmitting}
          />
        </Container>
      </main>
    </>
  );
};

export default SignUpFinalisation;
