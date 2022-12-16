import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlPaginationInput,
} from 'nest-utils';
import { PrismaService } from 'prismService';
import { ChangeMyNewsletterSettingsCommand } from './commands';
import { UpdateNewsletterInput } from './dto';
import { GetFilteredNewsletterInput } from './dto/get-newsletter.input';
import {
  NewsletterSettings,
  NewsletterSubscriber,
} from './entities/newsletter.entity';

@Resolver(() => NewsletterSettings)
@UseGuards(new GqlAuthorizationGuard([]))
export class NewsletterResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

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
  ) {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.newsletter.findMany({
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
