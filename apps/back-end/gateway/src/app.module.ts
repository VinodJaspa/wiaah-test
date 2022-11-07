import { Module } from '@nestjs/common';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { parseCookies, VerifyAndGetUserFromContext } from 'nest-utils';
import { subgraphs } from '@lib';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ context, request, kind }) {
              console.log('gateway req', context, request, kind);
              const user = VerifyAndGetUserFromContext(context);
              request.http.headers.set('user', JSON.stringify(user));
            },

            didReceiveResponse({ context, request, response }) {
              if (response.http.headers.get('set-cookie')) {
                const rawCookies = response.http.headers.get('set-cookie');
                if (rawCookies) {
                  const cookies = parseCookies(rawCookies);
                  cookies.forEach(({ cookieName, cookieValue, options }) => {
                    if (context.req && context.req.res) {
                      context.req.res.cookie(cookieName, cookieValue, {
                        ...options,
                      });
                    }
                  });
                }
              }

              return response;
            },
          });
        },

        supergraphSdl: new IntrospectAndCompose({
          subgraphs,
        }),
      },
    }),
  ],
})
export class AppModule {}
