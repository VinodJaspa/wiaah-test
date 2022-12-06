export * from './impl';

import {
  CreateVehicleServiceHandler,
  UpdateVehicleServiveHandler,
  UpdateVehicleStatusCommandHandler,
} from './handlers';

export const VehicleCommandsHandlers = [
  CreateVehicleServiceHandler,
  UpdateVehicleServiveHandler,
  UpdateVehicleStatusCommandHandler,
];
