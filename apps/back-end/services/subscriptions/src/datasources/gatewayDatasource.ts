import { GraphQLError } from 'graphql';
import {
  createHttpLink,
  execute,
  from,
  toPromise,
  GraphQLRequest,
} from '@apollo/client/core';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { DocumentNode } from 'graphql';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import fetch from 'node-fetch';
const merge = require('lodash/merge');

export function addGatewayDataSourceToSubscriptionContext<
  TDatasource extends GatewayDataSource,
  TDatasourceRecord extends Record<string, TDatasource>,
>(context, dataSources: TDatasourceRecord) {
  return {
    dataSources: {
      gatewayApi: Object.entries(dataSources).reduce((acc, curr) => {
        curr[1].initialize({ context, cache: undefined });
        return { ...acc, [curr[0]]: curr[1] };
      }, {} as TDatasourceRecord),
    },
  };
}

export class GatewayDataSource<TContext = any> extends DataSource {
  private gatewayURL;
  context!: TContext;

  constructor(gatewayURL: string) {
    super();
    this.gatewayURL = gatewayURL;
  }

  override initialize(config: DataSourceConfig<TContext>): void {
    this.context = config.context;
  }

  composeLinks(headers?: Record<string, any>) {
    const uri = this.resolveUri();
    return from([
      this.onErrorLink(),
      this.onRequestLink(),
      // @ts-ignore
      createHttpLink({ fetch, uri, credentials: 'same-origin', headers }),
    ]);
  }

  didEncounterError(error: any) {
    console.log({ error });
    const status = error.statusCode || 'INTERNAL_SERVER_ERROR';
    const message = error.bodyText || 'An unexpected error occurred';

    throw new GraphQLError(message, {
      extensions: { code: status },
    });
  }

  async query(query: DocumentNode, options: Omit<GraphQLRequest, 'query'>) {
    const link = this.composeLinks(options?.context?.req?.headers);
    try {
      const response = await toPromise(execute(link, { query, ...options }));
      return response;
    } catch (error) {
      this.didEncounterError(error);
    }
  }

  resolveUri() {
    if (!this.gatewayURL) {
      throw new GraphQLError('Missing gatewayURL', {
        extensions: { code: 'BAD_REQUEST' },
      });
    }
    return this.gatewayURL;
  }

  onRequestLink() {
    return setContext((request) => {
      if (typeof (this as any).willSendRequest === 'function') {
        (this as any).willSendRequest(request);
      }
      console.log({ request });
      return request;
    });
  }

  onErrorLink() {
    return onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map((graphqlError) =>
          console.error(`[GraphQL error]: ${graphqlError.message}`),
        );
      }
      if (networkError) {
        console.log(`[Network Error]: ${networkError}`);
      }
    });
  }
}
