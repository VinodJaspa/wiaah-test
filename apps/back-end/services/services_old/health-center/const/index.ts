import { ServiceStatus } from 'prismaClient';

export const HEALTH_CENTER_SERVICE_KEY = 'health-center';
export const HealthCenterStatus = ServiceStatus;
export type HealthCenterStatus = keyof typeof HealthCenterStatus;
