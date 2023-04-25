import { useLoginAsAccount, useSigninMutation } from "@UI";
import { Input } from "@partials";
import React from "react";
import { useForm } from "utils";

const SellerLogin = () => {
  const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>(
    { email: "", password: "" },
    {},
    { addLabel: true }
  );
  const { mutate } = useSigninMutation();
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-8">
      <div className="w-96">
        <Input {...inputProps("email")}></Input>
        <Input {...inputProps("password")}></Input>
      </div>
    </div>
  );
};

export default SellerLogin;
