import { createGraphqlRequestClient } from "api";
import { useMutation, UseMutationResult } from "react-query";

// Define types for the mutation variables and response
type SendContactUsMessageInput = {
  name: string;
  email: string;
  message: string;
};

type SendContactUsMessageResponse = {
  sendContactUsMessage: boolean;
};

// Define the GraphQL mutation
const SEND_CONTACT_US_MESSAGE_MUTATION = `
  mutation SendContactUsMessage($args: SendContactUsMessageInput!) {
    sendContactUsMessage(args: $args)
  }
`;

export const useSendContactUsMutation = (): UseMutationResult<
  boolean,
  Error,
  SendContactUsMessageInput
> => {
  const client = createGraphqlRequestClient();

  return useMutation<boolean, Error, SendContactUsMessageInput>(
    async (args) => {
      try {
        const response = await client.request<SendContactUsMessageResponse>(
          SEND_CONTACT_US_MESSAGE_MUTATION,
          { args },
        );

        return response.sendContactUsMessage;
      } catch (error) {
        throw new Error("Failed to send contact message");
      }
    },
  );
};
