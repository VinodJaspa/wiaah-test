import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  VehicleService,
  CreateVehicleServiceInput,
  CreateVehicleServiceCommand,
  GqlVehicleSelectedFields,
} from '@vehicle-service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GqlCurrentUser,
  GqlSelectedQueryFields,
} from 'nest-utils';

@Resolver(() => VehicleService)
export class VehicleResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => VehicleService)
  createVehicle(
    @Args('createVehicleInput', { type: () => CreateVehicleServiceInput })
    createVehicleInput: CreateVehicleServiceInput,
    @GqlCurrentUser()
    user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields() fields: GqlVehicleSelectedFields,
  ) {
    return this.commandBus.execute<CreateVehicleServiceCommand, VehicleService>(
      new CreateVehicleServiceCommand(createVehicleInput, user, fields),
    );
  }
}
