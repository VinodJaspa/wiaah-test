import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { IdentityVerification } from './entities/identity-verification.entity';
import { CreateIdentityVerificationInput } from './dto';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  ProvideVVCPictureCommand,
  RequestIdentityVerificationCommand,
} from './commands';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { AdminGetIdentitiyVerificationRequestsInput } from './dto/admin-get-identitiy-verification-requests';

@Resolver(() => IdentityVerification)
export class IdentityVerificationResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => IdentityVerification)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetAccountVerification(
    @Args('accountId') id: string,
  ): Promise<IdentityVerification> {
    return this.prisma.userIdenityVerificationRequest.findUnique({
      where: {
        userId: id,
      },
    });
  }

  @Query(() => [IdentityVerification])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetAccountIdentityVerificationRequests(
    @Args('args') args: AdminGetIdentitiyVerificationRequestsInput,
  ): Promise<IdentityVerification[]> {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.userIdenityVerificationRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  }

  @Query(() => IdentityVerification)
  @UseGuards(new GqlAuthorizationGuard([]))
  getMyVerificationRequest(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<IdentityVerification> {
    return this.prisma.userIdenityVerificationRequest.findUnique({
      where: {
        userId: user.id,
      },
    });
  }

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
