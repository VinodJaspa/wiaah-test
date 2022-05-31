import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import React from "react";
import { FlexStack, Spacer } from "ui";

const WishlistEmpty: React.FC = () => {
  const router = useRouter();
  function handleLoginRedirect() {
    router.push("/login");
  }
  return (
    <>
      <Spacer />
      <Spacer />
      <FlexStack
        fullWidth={true}
        direction="vertical"
        verticalSpacingInRem={1}
        alignItems="center"
      >
        <h1 className="text-3xl font-bold">MY WISHLIST</h1>
        <Spacer />
        <p className="text-center text-gray-500">
          It is empty
          <br />
          Personalize your shopping experience with your Wishlist.
        </p>
        <Spacer spaceInRem={0.5} />
        <h1 className="text-2xl font-bold">Already have items saved?</h1>
        <div>
          <Button onClick={handleLoginRedirect}>SIGN IN / REGISTER</Button>
        </div>
      </FlexStack>
    </>
  );
};

export default WishlistEmpty;
