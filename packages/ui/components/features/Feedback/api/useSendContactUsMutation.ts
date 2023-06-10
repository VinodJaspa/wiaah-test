import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useSendContactUsMutation = () =>
  useMutation<
    boolean,
    unknown,
    { name: string; email: string; message: string }
  >(async (args) => {
    const client = createGraphqlRequestClient();
    const res = await client
      .setQuery(
        `query sendContactUsMessage($args:SendContactUsMessageInput!){
    sendContactUsMessage(
        args:$args
    )
}`
      )
      .setVariables<>()
      .send<>();

    return res.data;
  });
