import { createClient } from "graphql-ws";

class WebsocketGraphqlSubscriptionClient {
  constructor(private client: ReturnType<typeof createClient>) {}
  subscribe<TData, TVars extends Record<string, unknown>>(
    query: string,
    vars: TVars,
    onData: (data: TData) => any
  ) {
    return new Promise((res, rej) =>
      this.client.subscribe(
        {
          query,
          variables: vars,
        },
        {
          async next(value) {
            console.log("next data", value);
            await onData(value.data as TData);
          },
          error: rej,
          complete() {
            res(null);
          },
        }
      )
    );
  }
}

export function createGraphQlSubscriptionClient() {
  const client = createClient({
    url: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL!,
  });
  return new WebsocketGraphqlSubscriptionClient(client);
}
