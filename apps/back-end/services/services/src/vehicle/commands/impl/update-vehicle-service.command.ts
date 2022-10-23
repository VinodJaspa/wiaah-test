import {
  AuthorizationDecodedUser,
  CommandBase,
  GqlSelectedFields,
} from 'nest-utils';
import { UpdateVehicleInput } from '../../dto';

export class UpdateVehicleServiceCommand extends CommandBase<
  {
    input: UpdateVehicleInput;
    user: AuthorizationDecodedUser;
  },
  GqlSelectedFields
> {}
