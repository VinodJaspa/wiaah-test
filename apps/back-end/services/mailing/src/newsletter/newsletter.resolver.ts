import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismService';
import { ChangeMyNewsletterSettingsCommand } from './commands';
import { UpdateNewsletterInput } from './dto';
import { GetFilteredNewsletterInput } from './dto/get-newsletter.input';
import { Account } from './entities';
import {
  NewsletterSettings,
  NewsletterSubscriber,
} from './entities/newsletter.entity';

@Resolver(() => NewsletterSubscriber)
@UseGuards(new GqlAuthorizationGuard([]))
export class NewsletterResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) { }

  @Query(() => NewsletterSettings)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetUserNewsletterSettings(@Args('accountId') id: string) {
    return this.prisma.newsletter.findUnique({
      where: {
        ownerId: id,
      },
    });
  }

  @Query(() => NewsletterSettings)
  @UseGuards(new GqlAuthorizationGuard([]))
  async getUserNewsletterSettings(
    @Args('accountId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.validateReadPremissions(id, user);
    return this.prisma.newsletter.findUnique({
      where: {
        ownerId: id,
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async changeUserNewsletterSettings(
    @Args('args') args: UpdateNewsletterInput,
    @Args('accountId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.validateWritePremissions(id, user);
    await this.prisma.newsletter.update({
      where: {
        ownerId: id,
      },
      data: args,
    });
  }

  @Mutation(() => Boolean)
  changeMyNewsletterSettings(
    @Args('args') args: UpdateNewsletterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<ChangeMyNewsletterSettingsCommand, boolean>(
      new ChangeMyNewsletterSettingsCommand(args, user),
    );
  }

  @Query(() => [NewsletterSubscriber])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getNewletterSubscribers(
    @Args('args', { type: () => GetFilteredNewsletterInput })
    args: GetFilteredNewsletterInput,
  ): Promise<NewsletterSubscriber[]> {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.newsletter.findMany({
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async removeNewsletterSubscriber(
    @Args('id', { type: () => ID })
    args: string,
  ): Promise<boolean> {
    try {
      await this.prisma.newsletter.delete({
        where: {
          ownerId: args,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  subscribeToNewsletter(
    @Args('email') email: string,
    @Args('name') name: string,
  ) {
    // TODO
  }

  @ResolveField(() => Account)
  user(@Parent() data: NewsletterSubscriber) {
    return {
      __typename: 'Account',
      id: data.ownerId,
    };
  }

  async validateWritePremissions(
    userId: string,
    user: AuthorizationDecodedUser,
  ) {
    if (userId !== user.id && user.accountType !== accountType.ADMIN)
      throw new UnauthorizedException();
  }

  async validateReadPremissions(
    userId: string,
    user: AuthorizationDecodedUser,
  ) {
    if (userId !== user.id && user.accountType !== accountType.ADMIN)
      throw new UnauthorizedException();
  }
}
