import { Exact, PaymentIntent } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation, useQuery } from "react-query";

export type GetCartPaymentIntentMutationVariables = Exact<{
  [key: string]: never;
}>;

export type GetCartPaymentIntentMutation = { __typename?: "Mutation" } & {
  createCartPaymentIntent: { __typename?: "PaymentIntent" } & Pick<
    PaymentIntent,
    "client_secret"
  >;
};

export const useGetCheckoutPaymentIntentQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation getCartPaymentIntent{
  createCartPaymentIntent {
    client_secret
  }
}
    `);

  return useMutation<
    GetCartPaymentIntentMutation["createCartPaymentIntent"],
    unknown,
    any
  >(["checkout-payment-intent"], async () => {
    const res = await client.send<GetCartPaymentIntentMutation>();

    return res.data.createCartPaymentIntent;
  });
};
