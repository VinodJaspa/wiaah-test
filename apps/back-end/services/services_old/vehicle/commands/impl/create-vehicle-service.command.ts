import {
  CreateVehicleServiceInput,
  GqlVehicleServiceSelectedFields,
} from '@vehicle-service';
import { AuthorizationDecodedUser, UserPreferedLang } from 'nest-utils';

export class CreateVehicleServiceCommand {
  constructor(
    public readonly createVehicleServiceInput: CreateVehicleServiceInput,
    public readonly user: AuthorizationDecodedUser,
    public readonly selectedFields: GqlVehicleServiceSelectedFields,
    public readonly langId: UserPreferedLang,
  ) {}
}
