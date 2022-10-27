export * from './impl';
import {
  handleVehicleServiceCreatedEvent,
  VehicleCreatedEventHandler,
} from './handlers';

export const VehicleEventsHandlers = [
  handleVehicleServiceCreatedEvent,
  VehicleCreatedEventHandler,
];
