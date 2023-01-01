import React from "react";
import { Button, FlexStack } from "@UI";
import { useScreenWidth } from "@UI";
export interface CookiesInfoBannerProps {
  onAcceptAll?: () => void;
  onLetMeChoose?: () => void;
}

export const CookiesInfoBanner: React.FC<CookiesInfoBannerProps> = ({
  onAcceptAll,
  onLetMeChoose,
}) => {
  function handleLetMeChoose() {
    onLetMeChoose && onLetMeChoose();
  }

  function handleAcceptAll() {
    onAcceptAll && onAcceptAll();
  }
  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row items-start md:items-center w-full justify-between bg-white p-4 rounded-md">
        <div className="flex flex-col">
          {/* // text */}
          <h1 className="text-xl font-bold">HOW WIAAH USES COOKIES</h1>
          <p>
            We use cookies that help us provide you with the best possible
            shopping experience with us
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-fit">
          {/* buttons */}
          <Button className="w-full sm:w-fit" onClick={() => handleAcceptAll()}>
            ACCEPT ALL
          </Button>
          <Button
            className="w-full sm:w-fit"
            onClick={() => handleLetMeChoose()}
            outline
          >
            LET ME CHOOSE
          </Button>
        </div>
      </div>
    </>
  );
};
