import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { BuyerProfileStartupView, Container } from "ui";

const SignUpFinalisation: NextPage = () => {
  // local state for StepperProps
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // example steps
  const stepsName = ["Account", "Details", "Confirmation"];

  return (
    <>
      <Head>
        <title>Wiaah | Buyer Signup Finalisation</title>
      </Head>
      <main className="block w-full min-h-screen">
        <Container>
          <BuyerProfileStartupView
            isFormSubmitting={isFormSubmitting}
            setFormSubmitting={setFormSubmitting}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            stepsName={stepsName}
          />
        </Container>
      </main>
    </>
  );
};

export default SignUpFinalisation;
