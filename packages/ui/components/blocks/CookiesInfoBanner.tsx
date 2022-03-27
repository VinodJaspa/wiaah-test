import React from "react";
import { Button, FlexStack } from "../partials";
import { getScreenWidth } from "ui";
export interface CookiesInfoBannerProps {
  onAcceptAll?: () => void;
  onLetMeChoose?: () => void;
}

export const CookiesInfoBanner: React.FC<CookiesInfoBannerProps> = ({
  onAcceptAll,
  onLetMeChoose,
}) => {
  const { min } = getScreenWidth({ minWidth: 1000 });

  console.log("min", min);

  function handleLetMeChoose() {}

  function handleAcceptAll() {}
  return (
    <>
      <FlexStack
        horizontalSpacingInRem={1}
        verticalSpacingInRem={min ? 0 : 1}
        direction={min ? "vertical" : "horizontal"}
        alignItems={min ? "start" : "center"}
        fullWidth={true}
        justify={"between"}
        customClassName="w-full bg-white p-4 rounded-md"
      >
        <FlexStack direction="vertical">
          {/* // text */}
          <h1 className="text-xl font-bold">HOW WIAAH USES COOKIES</h1>
          <p>
            We use cookies that help us provide you with the best possible
            shopping experience with us
          </p>
        </FlexStack>
        <FlexStack horizontalSpacingInRem={1}>
          {/* buttons */}
          <Button onClick={() => handleAcceptAll()}>
            <p className="w-48">ACCEPT ALL</p>
          </Button>
          <Button onClick={() => handleLetMeChoose()} outlined={true}>
            <p className="w-48 text-black">LET ME CHOOSE</p>
          </Button>
        </FlexStack>
      </FlexStack>
    </>
  );
};
