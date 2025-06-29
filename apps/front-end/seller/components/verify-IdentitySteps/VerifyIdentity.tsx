import React from "react";
import { useState } from "react";
import { RxIdCard } from "react-icons/rx";
import StepProgressBar from "./stepper";
export default function IdentityVerification() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <main className="flex flex-col md:flex-row bg-white px-4 md:px-12 pt-10 md:pt-20  min-h-screen">
   

      {/* Step Content */}
      <div className="w-full">
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full text-black font-medium w-fit mx-auto md:mx-0 mb-12">
          <RxIdCard />
          <span>Verify Your Identity</span>
        </div>
        {step === 1 && (
          <div className="space-y-6">
            <div className="w-full pt-12">
              <h2 className="font-bold mb-4 text-sm md:text-base lg:text-lg ">Verify your identity</h2>
              <p className="text-gray-600 mb-6 max-w-xl">
                To help keep our community safe, we'll need to verify your identity.
                This helps us confirm you're a real person and reduces fraud.
              </p>

              <div className="space-y-4 max-w-xl">
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-2 rounded">📇</div>
                  <div>
                    <p className="font-medium text-sm md:text-base lg:text-lg">Verify your identity</p>
                    <p className="text-gray-500 text-sm">Confirm your identity with a government-issued ID</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-2 rounded">🛡️</div>
                  <div>
                    <p className="font-medium">Your information is safe</p>
                    <p className="text-gray-500 text-sm">We’ll never share your information with anyone</p>
                  </div>
                </div>

                <button onClick={nextStep} className="mt-12 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-900 justify-end ">
                  Start verification
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-bold mb-4 text-sm md:text-base lg:text-lg ">Verify your identity</h2>
            <h3 className="text-2xl font-bold">Upload your ID</h3>
            <StepProgressBar currentStep={2} totalSteps={6} />
            <p className="text-sm text-gray-600">Take a photo of your government-issued ID. Make sure it's clear.</p>
            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center">
              <p className="font-semibold">Upload front of ID</p>
              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-sm">Upload</button>
            </div>
            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center">
              <p className="font-semibold">Upload back of ID</p>
              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-sm">Upload</button>
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="text-black border border-gray-400 px-6 py-2 rounded-full font-medium hover:bg-gray-100">Back</button>
              <button onClick={nextStep} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Preview your ID</h2>
            <img src="/sample-id.png" alt="ID Preview" className="mx-auto w-64 rounded shadow" />
            <button onClick={nextStep} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Continue</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold">Review & Edit</h2>
            {['Full Name', 'DOB', 'Address', 'Document Type'].map(label => (
              <input key={label} type="text" placeholder={label} className="w-full px-4 py-2 border rounded" />
            ))}
            <div className="flex justify-between">
              <button onClick={prevStep} className="text-black border border-gray-400 px-6 py-2 rounded-full font-medium hover:bg-gray-100">Back</button>
              <button onClick={nextStep} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Continue</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Verification Status</h2>
            <p className="text-gray-600">We are currently reviewing your information.</p>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              <li>Document received</li>
              <li>Details under review</li>
              <li>Confirmation pending</li>
            </ul>
            <div className="flex justify-between">
              <button onClick={prevStep} className="text-black border border-gray-400 px-6 py-2 rounded-full font-medium hover:bg-gray-100">Back</button>
              <button onClick={nextStep} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Continue</button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Identity Verified</h2>
            <p className="text-gray-600">Your identity has been successfully verified. Thank you!</p>
            <button onClick={() => setStep(1)} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Back to Dashboard</button>
          </div>
        )}
      </div>
    </main>
  );
}
