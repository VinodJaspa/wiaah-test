import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerProfileStartupView, Container } from "ui";

const SignUpFinalisation: NextPage = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isFormSubmitting, setFormSubmitting] = React.useState(false);
  const steps = [
    "Signup",
    "Email Verification",
    "Account Information",
    "Shop information",
    "Verify Your Identity",
    "Select a plan",
    "Listing",
    "Add Payment Method",
    "Shipping Settings",
    "Friends Invitaion",
  ];
  return (
    <>
      <Head>
        <title>Wiaah | Signup Finalisation</title>
      </Head>
      <main className="block w-full grow h-screen">
        <Container>
          <SellerProfileStartupView
          stepsName={steps}
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
