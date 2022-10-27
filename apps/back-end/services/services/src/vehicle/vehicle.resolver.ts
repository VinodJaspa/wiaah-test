import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import {
  VehicleService,
  CreateVehicleServiceInput,
  CreateVehicleServiceCommand,
  GqlVehicleServiceSelectedFields,
} from '@vehicle-service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlCurrentUser,
  GqlSelectedFields,
  GqlSelectedQueryFields,
  UserPreferedLang,
} from 'nest-utils';
import { GetAllVehiclesQuery, GetVehicleServiceByIdQuery } from './queries';

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
    @GqlSelectedQueryFields() fields: GqlVehicleServiceSelectedFields,
    @GetLang() langId: UserPreferedLang,
  ) {
    return this.commandBus.execute<CreateVehicleServiceCommand, VehicleService>(
      new CreateVehicleServiceCommand(createVehicleInput, user, fields, langId),
    );
  }

  @Query(() => [VehicleService])
  getAllVehicles(
    @GqlSelectedQueryFields() fields: GqlVehicleServiceSelectedFields,
    @GetLang() langId: UserPreferedLang,
  ) {
    return this.queryBus.execute<any, VehicleService[]>(
      new GetAllVehiclesQuery(langId, fields),
    );
  }

  @Query(() => VehicleService)
  getVehicleServicebyId(
    @Args('id', { type: () => String }) id: string,
    @GqlSelectedQueryFields() selectedFields: GqlSelectedFields,
    @GetLang() langId: UserPreferedLang,
  ) {
    return this.queryBus.execute<any, VehicleService>(
      new GetVehicleServiceByIdQuery({ langId, selectedFields, vehicleId: id }),
    );
  }
}
