import { GqlSelectedFields } from 'nest-utils';
import { VehicleService, Vehicle } from '../entities';

export type GqlVehicleServiceSelectedFields = GqlSelectedFields<VehicleService>;

export type GqlVehicleSelectedFields = GqlSelectedFields<Vehicle>;
