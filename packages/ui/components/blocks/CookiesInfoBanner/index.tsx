import React from "react";
import { Button } from "@UI";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";

export interface CookiesInfoBannerProps {
  onAcceptAll?: () => void;
  onLetMeChoose?: () => void;
}

export const CookiesInfoBanner: React.FC<CookiesInfoBannerProps> = ({
  onAcceptAll,
  onLetMeChoose,
}) => {
  return (
    <div className="flex gap-4 flex-col md:flex-row items-start md:items-center w-full justify-between bg-white p-4 rounded-xl border border-grey-600">
      {/* Text section */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-black">
          How Wiaah uses cookies
        </h1>
        <p className="text-sm text-gray-600">
          We use cookies that help us provide you with the best possible
          shopping experience with us
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-fit">
        <PrimaryButton
          className="w-full sm:w-fit"
          onClick={onAcceptAll}
        >
          Accept All
        </PrimaryButton>
        <button
          className="w-full sm:w-fit border border-black text-black text-base px-4 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
          onClick={onLetMeChoose}
        >
          Let me choose
        </button>



      </div>
    </div>
  );
};
