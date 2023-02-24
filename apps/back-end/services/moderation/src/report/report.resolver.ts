import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
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
import { NewsfeedPost, Product, Profile, Service } from './entities';
import { ReportType } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Resolver(() => Report)
export class ReportResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async reportContent(
    @Args('reportContentArgs') args: CreateReportInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandBus.execute(new CreateReportCommand(args, user.id));
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async removeReport(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.prisma.report.update({
      where: {
        id,
      },
      data: {
        status: 'clean',
      },
    });
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

  @ResolveField(() => Profile)
  profile(@Parent() report: Report) {
    if (report.type === ReportType.profile) {
      return {
        __typename: 'Profile',
        id: report.contentId,
      };
    } else return null;
  }

  @ResolveField(() => NewsfeedPost)
  post(@Parent() report: Report) {
    if (report.type === ReportType.post) {
      return {
        __typename: 'NewsfeedPost',
        id: report.contentId,
      };
    } else return null;
  }
  @ResolveField(() => Product)
  product(@Parent() report: Report) {
    if (report.type === ReportType.product) {
      return {
        __typename: 'Product',
        id: report.contentId,
      };
    } else return null;
  }
  @ResolveField(() => Service)
  service(@Parent() report: Report) {
    if (report.type === ReportType.service) {
      return {
        __typename: 'Service',
        id: report.contentId,
      };
    } else return null;
  }

  @ResolveField(() => Profile)
  reportedBy(@Parent() report: Report) {
    return {
      __typename: 'Profile',
      id: report.reportedById,
    };
  }
}
