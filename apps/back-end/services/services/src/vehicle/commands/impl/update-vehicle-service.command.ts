import {
  AuthorizationDecodedUser,
  CommandBase,
  GqlSelectedFields,
} from 'nest-utils';
import { UpdateVehicleServiceInput } from '../../dto';

export class UpdateVehicleServiceCommand extends CommandBase<
  {
    input: UpdateVehicleServiceInput;
    user: AuthorizationDecodedUser;
  },
  GqlSelectedFields
> {}
