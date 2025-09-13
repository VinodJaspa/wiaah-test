import React from "react";

type StepProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepProgressBar({
  currentStep,
  totalSteps,
}: StepProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      <p className="text-sm font-medium mb-2">{`Step ${currentStep} of ${totalSteps}`}</p>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-black h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
