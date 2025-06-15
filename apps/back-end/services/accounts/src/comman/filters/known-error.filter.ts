import { GraphQLError } from 'graphql';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { KnownError } from 'nest-utils';

@Catch(KnownError)
export class KnownErrorFilter implements ExceptionFilter {
  catch(exception: KnownError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    throw new GraphQLError(exception.message, {
      extensions: {
        code: 'KNOWN_ERROR',
        errorCode: exception.code,
      },
    });
  }
}
