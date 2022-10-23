import {
  CreateVehicleServiceInput,
  GqlVehicleSelectedFields,
} from '@vehicle-service';
import { AuthorizationDecodedUser, UserPreferedLang } from 'nest-utils';

export class CreateVehicleServiceCommand {
  constructor(
    public readonly createVehicleServiceInput: CreateVehicleServiceInput,
    public readonly user: AuthorizationDecodedUser,
    public readonly selectedFields: GqlVehicleSelectedFields,
    public readonly langId: UserPreferedLang,
  ) {}
}
