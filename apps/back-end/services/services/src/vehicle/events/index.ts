export * from './vehicle-service-created';
import { handleVehicleServiceCreatedEvent } from './vehicle-service-created';

export const vehicleEventsHandlers = [handleVehicleServiceCreatedEvent];
