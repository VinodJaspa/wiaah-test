import { ServiceStatus } from 'prismaClient';

export const BEAUTY_CENTER_SERVICE_KEY = 'beauty-center';
export const BeautyCenterStatus = ServiceStatus;
export type BeautyCenterStatus = keyof typeof BeautyCenterStatus;
