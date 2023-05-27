import { SellerLayout } from "@blocks";
import { SellerSigninView } from "@features/Auth/views";
import { NextPage } from "next";

const Signin: NextPage = () => {
  return (
    <SellerLayout>
      <div className="h-screen">
        <SellerSigninView />
      </div>
    </SellerLayout>
  );
};

export default Signin;
