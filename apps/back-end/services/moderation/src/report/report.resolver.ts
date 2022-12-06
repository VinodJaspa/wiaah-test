import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Report } from './entities/report.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReportInput, GetReportsInput } from '@report/dto';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { CreateReportCommand } from './commands';
import { GetReportsQuery } from './queries';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Report)
export class ReportResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @Mutation(() => Boolean)
  async reportContent(
    @Args('reportContentArgs') args: CreateReportInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandBus.execute(new CreateReportCommand(args, user.id));
    return true;
  }

  @Query(() => [Report])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getReports(
    @Args('getReportsArgs') args: GetReportsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(new GetReportsQuery(args, user.id));
  }
}
