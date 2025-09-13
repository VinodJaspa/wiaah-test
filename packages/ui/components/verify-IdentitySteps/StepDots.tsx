import React from "react";

interface StepDotsProps {
  currentStep: number;
  totalSteps: number;
}

const StepDots: React.FC<StepDotsProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const isActive = idx + 1 === currentStep;
        return (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              isActive ? "bg-black w-3 h-3" : "bg-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
};

export default StepDots;
