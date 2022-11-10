import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { IdentityVerification } from './entities/identity-verification.entity';
import { CreateIdentityVerificationInput } from './dto';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import {
  ProvideVVCPictureCommand,
  RequestIdentityVerificationCommand,
} from './commands';

@Resolver(() => IdentityVerification)
export class IdentityVerificationResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => String)
  requestIdVerification(
    @Args('requestInput') input: CreateIdentityVerificationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<string> {
    return this.commandBus.execute<RequestIdentityVerificationCommand, string>(
      new RequestIdentityVerificationCommand(input, user),
    );
  }

  @Mutation(() => Boolean)
  provideVVCPicture(
    @Args('pic') pic: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.commandBus.execute<ProvideVVCPictureCommand, boolean>(
      new ProvideVVCPictureCommand(pic, user),
    );
  }
}
