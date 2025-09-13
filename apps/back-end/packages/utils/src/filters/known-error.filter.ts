import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
  } from '@nestjs/common';
  import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { KnownError, PublicErrorCodes } from 'src/Errors';
  
  @Catch(KnownError)
  export class KnownErrorFilter implements ExceptionFilter {
    catch(exception: KnownError, host: ArgumentsHost) {
      const gqlHost = GqlArgumentsHost.create(host);
  
      return new GraphQLError(exception.message, {
        extensions: {
          type: 'KNOWN_ERROR',
          code: PublicErrorCodes[exception.code] || 'UNKNOWN',
          codeId: exception.code,
        },
      });
    }
  }
  