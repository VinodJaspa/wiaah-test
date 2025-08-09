import React, { forwardRef, useImperativeHandle, useRef } from "react";

import { useSignupMutation, useResendRegisterationCodeMutation } from "../services";
import { useSigninMutation } from "api";
import { errorToast, successToast } from "utils";
import { AuthFormStepOne, AuthFormStepOneRef } from "./Steps/AuthFormStepOne";
import FormSubmitLoader from "../components/Spinner";

export type AccountSignupRef = {
  submit: () => Promise<boolean>; 
};

type Props = {
  onSuccess: () => void;
};

export const AccountSignup = forwardRef<AccountSignupRef, Props>(
  ({ onSuccess }, ref) => {
    const formRef = useRef<AuthFormStepOneRef>(null);
 
    const signUp = useSignupMutation();
    const signIn = useSigninMutation();
    const { mutate: sendCode } = useResendRegisterationCodeMutation();

    useImperativeHandle(ref, () => ({
      submit: async () => {
        if (!formRef.current) return false;
    
        const errors = await formRef.current.validate();
        const isValid = Object.keys(errors).length === 0;
        if (!isValid) return false;
    
        const form = formRef.current.getValues();
        try {
          const res: any = await signUp.mutateAsync(form);
          console.log("Signup response:", res);
          sessionStorage.setItem("signup_email", form?.email);
          if (res?.error) {
            errorToast(res.error);
            return false;
          }
            // successToast("Sign up success!");
            sendCode({email:form?.email}) ;   
            return true;
  
        } catch (err: any) {

          // console.error("Signup flow error:", err);
          errorToast(err?.message || "Something went wrong");
          return false;
        }
      },
    }));
    

    return (
      <>
        <AuthFormStepOne ref={formRef} />
       
      </>
    );

  }
);
