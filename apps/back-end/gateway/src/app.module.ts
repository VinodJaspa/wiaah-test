import { Module } from '@nestjs/common';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { subgraphs, parseCookies } from '@lib';
import * as jwt from 'jsonwebtoken';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ context, kind, request }) {
              if (typeof context['req'] !== 'undefined') {
                // @ts-ignore
                if (context?.req?.headers && context?.req?.headers['cookie']) {
                  // @ts-ignore
                  const rawCookies = context.req.headers['cookie'];
                  const parsedCookies = parseCookies(rawCookies);
                  const cookiesKey = process.env.COOKIES_KEY || 'Auth_cookie';
                  const jwtSecret = process.env.JWT_SERCERT || 'secret';
                  if (typeof cookiesKey === 'string') {
                    const authToken = parsedCookies.find(
                      (cookie) => cookie.cookieName === cookiesKey,
                    ).cookieValue;
                    if (authToken) {
                      try {
                        const user = jwt.verify(authToken, jwtSecret);
                        if (typeof user === 'object') {
                          request.http.headers.set(
                            'user',
                            JSON.stringify(user),
                          );
                        }
                      } catch (error) {}
                    }
                  }
                }
              }
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
