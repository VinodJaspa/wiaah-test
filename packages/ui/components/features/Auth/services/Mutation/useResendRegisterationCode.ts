import { createGraphqlRequestClient } from "api";
import { useGraphqlRequestClient } from "@UI/libs/useGraphqlRequestClient";
import { Exact, Mutation } from "@features/API";
import { useMutation } from "react-query";
import { toast } from "react-toastify";


export type ResendEmailVerificationCodeMutationVariables = Exact<{
  [key: string]: never;
}>;

export type ResendEmailVerificationCodeMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "resendRegisterationCode">;

export const useResendRegisterationCodeMutation = () => {
  return useMutation(
    ["resend-email-verification-code"],
    async () => {
      const client = createGraphqlRequestClient();
      const res = await client
        .setQuery(
          `mutation resendEmailVerificationCode {
            resendRegisterationCode
          }`
        )
        .setVariables<ResendEmailVerificationCodeMutationVariables>({})
        .send<ResendEmailVerificationCodeMutation>();

      return res.data.resendRegisterationCode;
    },
    {
      onSuccess: () => {
        toast.success("Verification code sent successfully.");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to send verification code.");
      },
    }
  );
};
