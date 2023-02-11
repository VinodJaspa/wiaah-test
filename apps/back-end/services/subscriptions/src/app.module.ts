import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

import { GenerateDataSources } from './datasources';
import { ResolversModule } from './resolvers.module';
import { VerifyAndGetUserFromContext } from 'nest-utils';

export const gatewayEndpoint = 'http://localhost:3003/graphql';
export const subgraphs = [
  { name: 'auth', url: 'http://localhost:3004/graphql' },
  { name: 'accounts', url: 'http://localhost:3005/graphql' },
  { name: 'products', url: 'http://localhost:3006/graphql' },
  { name: 'wishlist', url: 'http://localhost:3009/graphql' },
  // { name: 'shop', url: 'http://localhost:3007/graphql' },
  { name: 'reviews', url: 'http://localhost:3010/graphql' },
  { name: 'search', url: 'http://localhost:3008/graphql' },
  { name: 'services', url: 'http://localhost:3020/graphql' },
  { name: 'chat', url: 'http://localhost:3022/graphql' },
  // { name: 'notification', url: 'http://localhost:3025/graphql' },
  // { name: 'membership', url: 'http://localhost:3026/graphql' },
  { name: 'billing', url: 'http://localhost:3015/graphql' },
  { name: 'shoppingCart', url: 'http://localhost:3011/graphql' },
  { name: 'affiliation', url: 'http://localhost:3029/graphql' },
  { name: 'social', url: 'http://localhost:3017/graphql' },
  { name: 'orders', url: 'http://localhost:3014/graphql' },
  { name: 'hashtag', url: 'http://localhost:3024/graphql' },
  { name: 'voucher', url: 'http://localhost:3016/graphql' },
  { name: 'currency', url: 'http://localhost:3012/graphql' },
];

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

                return {
                  token: user ? user.token : null,
                  user,
                  ...dataSource,
                } as any;
              },
            },
          },
          installSubscriptionHandlers: true,
          autoSchemaFile: true,
          async transformSchema(_schema) {
            let schema: GraphQLSchema;

            const gateway = new ApolloGateway({
              debug: true,
              supergraphSdl: new IntrospectAndCompose({
                subgraphs,
              }),
              pollIntervalInMs: 120000,
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
            const user = VerifyAndGetUserFromContext({
              req: ctx?.extra?.request,
            });
            console.log({ ctx: user });
            return { token: token || null, user, ...ctx, ...dataSources };
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
