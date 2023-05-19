import { Module } from '@nestjs/common';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import {
  KnownError,
  parseCookies,
  PublicErrorCodes,
  UnknownError,
  VerifyAndGetUserFromContext,
} from 'nest-utils';
import { subgraphs } from '@lib';
// import { client } from './main';
import { ObjectId } from 'mongodb';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: {
          origin: ['http://localhost:3000', 'http://localhost:3002'],
          credentials: true,
        },
        context: async (ctx) => {
          const _user = VerifyAndGetUserFromContext(ctx);

          const userId = _user?.id;
          const user = {};
          // ? await client
          //     .db()
          //     .collection('Account')
          //     .findOne({ _id: new ObjectId(userId) })
          // : {};

          return {
            ...ctx,
            user: { ...user, id: (user['_id'] as ObjectId)?.toHexString() },
          };
        },
        formatError(error) {
          const exception = error?.extensions?.exception;

          const errorCodesValues = Object.values(PublicErrorCodes);

          const values = errorCodesValues.slice(
            errorCodesValues.length / 2,
            errorCodesValues.length,
          );

          const isKnownError = values.includes(exception.code);

          console.log({ isKnownError, values, code: exception.code });
          if (isKnownError) {
            console.log('true', exception.code);
            return error;
          } else {
            console.log('false', exception?.code);
            return new UnknownError();
          }
        },
      },
      gateway: {
        buildService({ url, name }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ context, request, kind }) {
              try {
                const contentType = (context as any)?.req?.headers[
                  'content-type'
                ];
                console.log({ contentType });
                if (
                  contentType &&
                  contentType.startsWith('multipart/form-data')
                ) {
                  console.log({ contentType });
                  request.http.headers.set('content-type', contentType);
                }
              } catch (error) {
                console.error('will send request error', { error });
              }
              const user = context['user'];
              console.log({ uSer: user });
              request.http.headers.set(
                'user',
                typeof user === 'object'
                  ? JSON.stringify(context['user'])
                  : null,
              );
            },

            didReceiveResponse({ context, response }) {
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
        serviceHealthCheck: true,
        pollIntervalInMs: 10000,
        supergraphSdl: new IntrospectAndCompose({
          subgraphs,
        }),
      },
    }),
  ],
})
export class AppModule {}
