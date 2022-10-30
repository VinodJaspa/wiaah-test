export * from './impl';
import { CreateElasticHealthCenterCommandHandler } from './handlers';

export const healthCenterEventHandlers = [
  CreateElasticHealthCenterCommandHandler,
];
