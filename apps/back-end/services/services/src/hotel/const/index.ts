import { ServiceStatus } from 'prismaClient';

export const HOTEL_ROOM_SERVICE_KEY = 'hotel-room';
export const HotelStatus = ServiceStatus;
export type HotelStatus = keyof typeof HotelStatus;
