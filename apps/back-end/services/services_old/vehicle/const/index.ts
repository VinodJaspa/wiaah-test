import { ServiceStatus } from 'prismaClient';

export const VEHICLE_SERVICE_KEY = 'vehicle';

export const VehicleStatus = ServiceStatus;
export type VehicleStatus = keyof typeof VehicleStatus;
