import { gql, GraphQLClient } from "graphql-request";
import { ReactPubsubClient } from "react-pubsub";

const GraphqlPubsubClient = new ReactPubsubClient();

enum KnownErrorCodes {
  unAuthorized = 0,
  deniedPremission = 1,
}

const pubsubEvents = {
  errorCode: (code: any) => {
    return `graphql-request-error-${code}`;
  },
};

export const useGraphqlRequestErrorCode = (
  getCode: (codes: typeof KnownErrorCodes) => KnownErrorCodes,
  cb: () => any
) => {
  GraphqlPubsubClient.Subscribe(
    pubsubEvents.errorCode(
      typeof getCode === "function" ? getCode(KnownErrorCodes) : ""
    ),
    cb
  );
};

export class GraphqlRequestClient extends GraphQLClient {
  private query: string | null = null;
  private vars: any = {};

  setHost(host: string) {
    this.setEndpoint(host);
    return this;
  }

  setQuery(query: string) {
    this.query = gql`
      ${query}
    `;

    return this;
  }

  setVariables<T>(vars: T) {
    this.vars = vars;
    return this;
  }

  async send<TRes>() {
    try {
      if (!this.query) throw new Error("no query");

      const res = await this.rawRequest<TRes>(this.query, this.vars);
      return res;
    } catch (error) {
      // @ts-ignore
      const errors = error?.response?.errors.map((v) => ({
        code: v?.extensions?.exception?.code,
      }));

      const validErrors = errors?.filter(
        // @ts-ignore
        (v) => typeof v.code === "string" || typeof v.code === "number"
      );

      validErrors?.forEach((v: { code: typeof KnownErrorCodes }) => {
        const code = pubsubEvents.errorCode(v.code);
        GraphqlPubsubClient.Publish(code);
      });

      return null as unknown as { data: TRes };
    }
  }
}

export function createGraphqlRequestClient(cred: boolean = true) {
  const client = new GraphqlRequestClient("http://localhost:3003/graphql", {
    credentials: cred ? "include" : undefined,
  });
  return client;
}
