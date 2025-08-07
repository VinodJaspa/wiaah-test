import { gql, GraphQLClient, Variables } from "graphql-request";
import { ReactPubsubClient } from "react-pubsub";

// Enum for known error codes
export enum KnownErrorCodes {
  Unauthorized = 0,
  DeniedPermission = 1,
}

// Type for GraphQL error
type GraphQLError = {
  message?: string;
  extensions?: {
    exception?: {
      code?: string | number;
    };
  };
};

// PubSub client
const pubsubClient = new ReactPubsubClient();

// Helper to create event name
const createErrorEventName = (code: string | number) =>
  `graphql-request-error-${code}`;

// Hook to listen to known error code events
export const useGraphqlRequestErrorCode = (
  getCode: (codes: typeof KnownErrorCodes) => KnownErrorCodes,
  callback: () => void
) => {
  const errorCode =
    typeof getCode === "function" ? getCode(KnownErrorCodes) : "";
  pubsubClient.Subscribe(createErrorEventName(errorCode), callback);
};

// ✅ The improved GraphQL client class
export class GraphqlRequestClient {
  private client: GraphQLClient;
  private query: string | null = null;
  private variables: Record<string, any> = {};

  constructor(
    url: string,
    options?: ConstructorParameters<typeof GraphQLClient>[1]
  ) {
    this.client = new GraphQLClient(url, options);
  }

  setHost(host: string): this {
    this.client.setEndpoint(host);
    return this;
  }

  setQuery(query: string): this {
    this.query = gql`${query}`;
    return this;
  }

  setVariables<T extends Record<string, any>>(variables: T): this {
    this.variables = variables;
    return this;
  }

  // ✅ Returns response or throws error
  async send<TResponse>(): Promise<{ data: TResponse }> {
    if (!this.query) {
      throw new Error("No query set");
    }

    try {
      const response = await this.client.rawRequest<TResponse>(
        this.query,
        this.variables
      );
      return response;
    } catch (error: unknown) {
      this.handleError(error);
      throw error; // 🔁 Let the caller handle the actual error
    }
  }

  async request<T = any, V extends Variables = Variables>(
    document: string,
    variables?: V
  ): Promise<T> {
    try {
      const response = await this.client.request<T>(document, variables);
      return response;
    } catch (error: unknown) {
      this.handleError(error);
      throw error;
    }
  }

  // 🔔 Publish error codes
  private handleError(error: unknown): void {
    if (error && typeof error === "object" && "response" in error) {
      const graphqlError = error as { response?: { errors?: GraphQLError[] } };
      const errors = graphqlError.response?.errors;

      if (errors) {
        errors.forEach((err) => {
          const code = err.extensions?.exception?.code;
          if (code !== undefined) {
            pubsubClient.Publish(createErrorEventName(code));
          }
        });
      }
    }
  }
}

// ✅ Create instance of the client
export function createGraphqlRequestClient(
  useCredentials: boolean = true
): GraphqlRequestClient {
  return new GraphqlRequestClient("http://localhost:3003/graphql", {
    credentials: useCredentials ? "include" : undefined,
  });
}
