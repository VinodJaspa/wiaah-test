import { createGraphqlRequestClient } from "api";
import { useGraphqlRequestClient } from "@UI/libs/useGraphqlRequestClient";
import { Exact, Mutation } from "@features/API";
import { useMutation } from "react-query";
import { toast } from "react-toastify";


export type ResendEmailVerificationCodeMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "resendRegisterationCode">;

export type ResendEmailVerificationCodeMutationVariables = Exact<{
  email: string;
}>;
export const useResendRegisterationCodeMutation = () => {
  return useMutation(
    ["resend-email-verification-code"],
    async ({ email }: { email: string }) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(`
          mutation resendEmailVerificationCode($email: String!) {
            resendRegisterationCode(input: { email: $email })
          }
        `)
        .setVariables({ email }) // 👈 still sending email as variable
        .send();

      return (res.data as ResendEmailVerificationCodeMutation).resendRegisterationCode;
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



