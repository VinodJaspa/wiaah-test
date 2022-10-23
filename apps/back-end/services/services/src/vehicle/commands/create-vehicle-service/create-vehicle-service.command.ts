import {
  CreateVehicleServiceInput,
  GqlVehicleSelectedFields,
} from '@vehicle-service';
import { AuthorizationDecodedUser } from 'nest-utils';

export class CreateVehicleServiceCommand {
  constructor(
    public readonly createVehicleServiceInput: CreateVehicleServiceInput,
    public readonly user: AuthorizationDecodedUser,
    public readonly selectedFields: GqlVehicleSelectedFields,
  ) {}
}
