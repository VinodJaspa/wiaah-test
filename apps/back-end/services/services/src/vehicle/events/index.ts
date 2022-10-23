export * from './impl';
import { handleVehicleServiceCreatedEvent } from './handlers';

export const VehicleEventsHandlers = [handleVehicleServiceCreatedEvent];
