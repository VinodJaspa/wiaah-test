import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import {
  parseCookies,
  PublicErrorCodes,
  UnknownError,
  VerifyAndGetUserFromContext,
} from 'nest-utils';
import { subgraphs } from '@lib';
import { ObjectId } from 'mongodb';
import { client } from './main';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req, res }) => {
          return {
            req,
            res,
            user: req.user
          };
        },

        formatError(error) {
          const exception: any = error?.extensions?.exception;
          const isSchemaValidationError =
            error?.extensions?.code === 'GRAPHQL_VALIDATION_FAILED' ||
            error.extensions.code === 'BAD_USER_INPUT';

          const errorCodesValues = Object.values(PublicErrorCodes);
          const knownCodes = errorCodesValues.slice(
            errorCodesValues.length / 2,
            errorCodesValues.length
          );
          const isKnownError = knownCodes.includes(exception?.code);

          console.log({ isSchemaValidationError, isKnownError }, error);

          if (isKnownError || isSchemaValidationError) {
            return error;
          } else {
            return new UnknownError();
          }
        },
      },
      gateway: {
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ context, request }) {
              try {
                const contentType = context?.req?.headers['content-type'];
                if (contentType?.startsWith('multipart/form-data')) {
                  request.http.headers.set('content-type', contentType);
                }
              } catch (error) {
                console.error('Error setting content-type:', error);
              }
              console.log('🚀 willSendRequest context.user:', context.user)
              const user = context?.user;
              if (user && user.id) {
                const safeUser = {
                  id: user.id,
                  email: user.email,
                  role: user.role,
                };
                const serializedUser = JSON.stringify(safeUser);
                request.http.headers.set('user', serializedUser);
            
                // ✅ Add log here
                console.log('>>> Setting user header for subgraph:', serializedUser);
              } else {
                console.warn('>>> No user found in context, not setting user header.');
              }
            },
            
            didReceiveResponse({ context, response }) {
              const rawCookies = response.http.headers.get('set-cookie');
              if (rawCookies) {
                const cookies = parseCookies(rawCookies);
                cookies.forEach(({ cookieName, cookieValue, options }) => {
                  if (context?.req?.res) {
                    context.req.res.cookie(cookieName, cookieValue, {
                      ...options,
                    });
                  }
                });
              }
              return response;
            },
          });
        },
        serviceHealthCheck: true,
        pollIntervalInMs: 10000,
        supergraphSdl: new IntrospectAndCompose({ subgraphs }),
      },
    }),
  ],
})
export class AppModule { }
