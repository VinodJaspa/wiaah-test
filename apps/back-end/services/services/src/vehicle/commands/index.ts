export * from './impl';

import {
  CreateVehicleServiceHandler,
  UpdateVehicleServiveHandler,
} from './handlers';

export const VehicleCommandsHandlers = [
  CreateVehicleServiceHandler,
  UpdateVehicleServiveHandler,
];
