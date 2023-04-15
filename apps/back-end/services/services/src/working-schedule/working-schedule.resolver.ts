import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { ServiceWorkingSchedule } from '@working-schedule/entities';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { GetWorkingScheduleQuery } from '@working-schedule/queries';
import { UpdateUserWorkingSchedule } from '@working-schedule/commands';
import { UpdateWorkingScheduleInput } from '@working-schedule/dto';
import { PrismaService } from 'prismaService';

@Resolver(() => ServiceWorkingSchedule)
@UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
export class WorkingScheduleResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => ServiceWorkingSchedule)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetAccountWorkingSchedule(@Args('accountId') id: string) {
    return this.prisma.serviceWorkingSchedule.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation(() => ServiceWorkingSchedule)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminUpdateAccountWorkingSchedule(
    @Args('args') input: UpdateWorkingScheduleInput,
    @Args('accountId') id: string,
  ) {
    return this.commandbus.execute<UpdateUserWorkingSchedule>(
      new UpdateUserWorkingSchedule(id, input, id),
    );
  }

  @Query(() => ServiceWorkingSchedule)
  getMyWorkingSchedule(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.querybus.execute<GetWorkingScheduleQuery>(
      new GetWorkingScheduleQuery(user.id),
    );
  }

  @Mutation(() => ServiceWorkingSchedule)
  updateMyWorkingSchedule(
    @Args('args') input: UpdateWorkingScheduleInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<UpdateUserWorkingSchedule>(
      new UpdateUserWorkingSchedule(user.id, input, user.id),
    );
  }

  @ResolveReference()
  resloveReference(ref: { __typename: string; id: string }) {
    return this.querybus.execute<GetWorkingScheduleQuery>(
      new GetWorkingScheduleQuery(ref.id),
    );
  }
}
