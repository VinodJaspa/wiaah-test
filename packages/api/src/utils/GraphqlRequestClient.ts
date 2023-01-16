import { gql, request, GraphQLClient } from "graphql-request";

export class GraphqlRequestClinet extends GraphQLClient {
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
    console.log("sending", this.query, this.vars);
    if (!this.query) throw new Error("no query");

    console.log("requesting");
    const res = await this.request<TRes>(this.query, this.vars);
    console.log("res", res);
    return res;
  }
}

export function createGraphqlRequestClient(cred?: boolean) {
  const client = new GraphqlRequestClinet(
    process.env.NEXT_PUBLIC_GATEWAY_URL!,
    { credentials: cred ? "include" : undefined }
  );
  return client;
}
