import { gql, request, GraphQLClient } from "graphql-request";

export class GraphqlRequestClinet extends GraphQLClient {
  private query: string | null = null;
  private vars: Record<string, any> = {};

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

  setVariables(vars: Record<string, any>) {
    this.vars = vars;
    return this;
  }

  async send() {
    console.log("sending", this.query, this.vars);
    if (!this.query) throw new Error("no query");

    console.log("requesting");
    const res = await this.request(this.query, this.vars);
    console.log("res", res);
  }
}

export function createGraphqlRequestClient(cred?: boolean) {
  const client = new GraphqlRequestClinet(
    process.env.NEXT_PUBLIC_GATEWAY_URL!,
    { credentials: cred ? "include" : undefined }
  );
  return client;
}
