export * from './impl';
import {
  GetAllVehicleQueryHandler,
  GetVehicleServiceByIdHandler,
  SearchFilteredVehiclesQueryHandler,
} from './handlers';

export const VehicleQueriesHandlers = [
  GetVehicleServiceByIdHandler,
  GetAllVehicleQueryHandler,
  SearchFilteredVehiclesQueryHandler,
];
