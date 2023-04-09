export * from './impl';
import {
  GetAllVehicleQueryHandler,
  GetVehicleServiceByIdHandler,
  SearchFilteredVehiclesQueryHandler,
  GetVehicleByIdQueryHandler,
} from './handlers';

export const VehicleQueriesHandlers = [
  GetVehicleServiceByIdHandler,
  GetAllVehicleQueryHandler,
  SearchFilteredVehiclesQueryHandler,
  GetVehicleByIdQueryHandler,
];
