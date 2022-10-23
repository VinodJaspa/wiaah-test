import { GqlSelectedFields } from 'nest-utils';
import { VehicleService } from '@vehicle-service';

export type GqlVehicleSelectedFields = GqlSelectedFields<VehicleService>;
