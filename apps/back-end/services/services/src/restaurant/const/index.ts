import { ServiceStatus } from 'prismaClient';

export const RESTAURANT_SERVICE_KEY = 'restaurant';
export const RestaurantStatus = ServiceStatus;
export type RestaurantStatus = keyof typeof RestaurantStatus;
