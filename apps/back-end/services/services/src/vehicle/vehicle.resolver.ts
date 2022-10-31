import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveReference,
} from '@nestjs/graphql';
import {
  VehicleService,
  CreateVehicleServiceInput,
  CreateVehicleServiceCommand,
  GqlVehicleServiceSelectedFields,
  GqlVehicleSelectedFields,
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
import { Vehicle } from './entities';

import { GetAllVehiclesQuery, GetVehicleServiceByIdQuery } from './queries';
import { GetVehicleByIdQuery } from './queries/impl/get-vehicle-by-id.query';

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

  @ResolveReference()
  resloveRef(
    ref: { __typename: string; id: string },
    @GqlSelectedQueryFields() fields: GqlVehicleSelectedFields,
    @GetLang() langId: UserPreferedLang,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Vehicle> {
    return this.queryBus.execute<GetVehicleByIdQuery>({
      args: {
        langId,
        selectedFields: fields,
        userId: user.id,
        vehicleId: ref.id,
      },
    });
  }
}
