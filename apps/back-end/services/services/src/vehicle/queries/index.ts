export * from './impl';
import {
  GetAllVehicleQueryHandler,
  GetVehicleServiceByIdHandler,
} from './handlers';

export const VehicleQueriesHandlers = [
  GetVehicleServiceByIdHandler,
  GetAllVehicleQueryHandler,
];
