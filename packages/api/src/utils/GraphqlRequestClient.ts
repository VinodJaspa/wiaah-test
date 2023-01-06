import { gql, request } from "graphql-request";

export class GraphqlRequestClinet {
  private host: string | null = null;
  private query: string | null = null;
  private vars: Record<string, any> = {};

  setHost(host: string) {
    this.host = host;
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

  send() {
    if (!this.host) throw new Error("no host");
    if (!this.query) throw new Error("no query");

    return request(this.host, this.query, this.vars);
  }
}

export function createGraphqlRequestClient() {
  const client = new GraphqlRequestClinet();
  return client.setHost(process.env.GATEWAY_URL!);
}
