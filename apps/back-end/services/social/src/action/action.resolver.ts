import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Action } from '@action/entities';
import { CreateActionInput, GetUserActionsInput } from '@action/dto';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { CreateActionCommand } from '@action/commands';
import { GetActionByIdQuery, GetUserActionsQuery } from '@action/queries';
import { UploadService } from '@wiaah/upload';

@Resolver(() => Action)
export class ActionResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
    private readonly uploadService: UploadService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async createAction(
    @Args('args') args: CreateActionInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const src = args.src.file;

    const res = await this.uploadService.uploadFiles([
      {
        file: {
          stream: src.createReadStream(),
          meta: {
            mimetype: src.mimetype,
            name: src.filename,
          },
        },
        options: {
          allowedMimtypes: [],
          maxSecDuration: 180,
        },
      },
    ]);

    await this.commandbus.execute<CreateActionCommand, Action>(
      new CreateActionCommand(args, user.id),
    );

    return true;
  }

  @Query(() => [Action])
  getUserActions(
    @Args('args') args: GetUserActionsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetUserActionsQuery>(
      new GetUserActionsQuery(args.userId, args.pagination, user.id),
    );
  }

  @Query(() => [Action])
  getAction(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<GetActionByIdQuery>(
      new GetActionByIdQuery(id, user.id),
    );
  }
}
