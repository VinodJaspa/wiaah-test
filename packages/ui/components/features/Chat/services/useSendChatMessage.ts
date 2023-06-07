import { ChatMessage, CreateMessageInput, Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type SendMessageMutationVariables = Exact<{
  args: CreateMessageInput;
}>;

export type SendMessageMutation = { __typename?: "Mutation" } & {
  sendMessage: { __typename?: "ChatMessage" } & Pick<ChatMessage, "id">;
};

export const useSendChatMessageMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation sendMessage(
  $args:CreateMessageInput!
){
  sendMessage(
		sendMessageInput:$args
  ){
    id
  }
}
    `);

  return useMutation<
    SendMessageMutation["sendMessage"],
    unknown,
    SendMessageMutationVariables["args"]
  >(["send-message"], async (data) => {
    const res = await client
      .setVariables<SendMessageMutationVariables>({
        args: data,
      })
      .send<SendMessageMutation>();
    return res.data.sendMessage;
  });
};
