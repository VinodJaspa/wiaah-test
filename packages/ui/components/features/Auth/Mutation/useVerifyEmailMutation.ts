import { createGraphqlRequestClient } from "api/src/utils";
import { useMutation } from "react-query";

export const useVerifyEmailMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(
    `
    mutation verify(
        $code:String!
    ){
        verifyEmail(
            EmailVerificationInput:{
                verificationCode:$code
            }
        )
    }
    `
  );

  return useMutation<
    unknown,
    unknown,
    {
      code: string;
    }
  >("verify-email", (input) => client.setVariables(input).send(), {
    onMutate(variables) {
      console.log("mutate", variables);
    },
  });
};
