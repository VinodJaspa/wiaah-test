import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "ui/views";
import { MasterLayout } from "@components";

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  PersonIcon,
  LockIcon,
  AspectRatio,
  LogoIcon,
  useSellerSignupMutation,
} from "ui";

import { useForm } from "utils";
import * as yup from "yup";
import { useRouting } from "routing";

const SellerSignup: NextPage = () => {
  const { push } = useRouting();
  const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>(
    {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    {},
    {
      addPlaceholder: true,
      yupSchema: yup.object({
        email: yup.string().email().required(),
        lastName: yup.string().required(),
        firstName: yup.string().required(),
        password: yup.string().min(6).max(12).required(),
        confirmPassword: yup.string().required(),
      }),
    }
  );

  const { mutate, data } = useSellerSignupMutation();

  return (
    <>
      <Head>
        <title>Wiaah | Buyer SignUp</title>
      </Head>
      <MasterLayout>
        <main className="block w-full grow">
          <Login
            onSubmit={(data, type) => {
              type === "buyer-signup" ? mutate(data) : null;
            }}
            loginType={"buyer-signup"}
          />
        </main>
      </MasterLayout>
    </>
  );
};

export default SellerSignup;
