import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloGateway } from '@apollo/gateway';
import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

import { ChatDataSource, GenerateDataSources } from './datasources';
import { addGatewayDataSourceToSubscriptionContext } from './datasources/gatewayDatasource';
import { ResolversModule } from './resolvers.module';
import { VerifyAndGetUserFromContext } from 'nest-utils';

export const gatewayEndpoint = 'http://localhost:3003/graphql';

@Module({
  imports: [
    ResolversModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        return {
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': {
              onConnect: async (headers, ctx) => {
                console.log({ headers });
                const user = VerifyAndGetUserFromContext({ headers });
                const dataSource = GenerateDataSources(ctx);

                return { token: user.token, user, ...dataSource } as any;
              },
            },
          },
          installSubscriptionHandlers: true,
          autoSchemaFile: true,
          async transformSchema(_schema) {
            let schema: GraphQLSchema;

            const gateway = new ApolloGateway({
              debug: true,
              serviceList: [
                // { name: 'products', url: 'http://localhost:3006/graphql' },
                // { name: 'wishlist', url: 'http://localhost:3009/graphql' },
                { name: 'chat', url: 'http://localhost:3022/graphql' },
                // { name: 'services', url: 'http://localhost:3020/graphql' },
                // { name: 'accounts', url: 'http://localhost:3005/graphql' },
              ],
              experimental_pollInterval: 36000,
            });
            gateway.onSchemaLoadOrUpdate((schemaContext) => {
              schema = schemaContext.apiSchema;
            });

            const res = await gateway.load();

            return mergeSchemas({
              schemas: [res.schema, _schema],
              assumeValid: true,
            });
          },
          playground: true,
          context: async (ctx) => {
            // If a token was sent for auth purposes, retrieve it here
            const token = ctx?.connectionParams?.token;

            // Instantiate and initialize the GatewayDataSource subclass
            // (data source methods will be accessible on the `gatewayApi` key)
            const dataSources = GenerateDataSources(ctx);
            // Return the complete context for the request
            return { token: token || null, ...dataSources };
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
