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
    console.log("send");
    if (!this.query) throw new Error("no query");

    const res = await this.rawRequest<TRes>(this.query, this.vars);
    return res;
  }
}

export function createGraphqlRequestClient(cred: boolean = true) {
  const client = new GraphqlRequestClinet("http://localhost:3003/graphql", {
    credentials: cred ? "include" : undefined,
  });
  return client;
}
