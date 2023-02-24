import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuspenseContentInput } from '@content-suspense/dto';
import { SuspenseContentCommand } from './commands/impl';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class ContentSuspenseResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Boolean)
  async suspenseContent(
    @Args('suspenseContentArgs') args: SuspenseContentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      await this.commandbus.execute(new SuspenseContentCommand(args, user.id));
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async suspenseReportedContent(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      const report = await this.prisma.report.findUnique({
        where: {
          id,
        },
      });

      await this.commandbus.execute(
        new SuspenseContentCommand(
          { id, type: report.type === 'post' ? 'newsfeed-post' : report.type },
          user.id,
        ),
      );
      await this.prisma.report.update({
        where: {
          id,
        },
        data: {
          status: 'suspended',
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
