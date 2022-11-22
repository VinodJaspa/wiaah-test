import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { WorkingSchedule } from '@working-schedule/entities';
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

@Resolver(() => WorkingSchedule)
@UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
export class WorkingScheduleResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
  ) {}

  @Query(() => WorkingSchedule)
  getMyWorkingSchedule(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.querybus.execute<GetWorkingScheduleQuery>(
      new GetWorkingScheduleQuery(user.id),
    );
  }

  @Mutation(() => WorkingSchedule)
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
