import { SellerSigninView } from "@features/Auth/views";
import { NextPage } from "next";

const Signin: NextPage = () => {
  return (
    <div className="h-screen">
      <SellerSigninView />
    </div>
  );
};

export default Signin;
