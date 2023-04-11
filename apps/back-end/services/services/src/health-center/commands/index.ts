export * from './impl';
import {
  CreateElasticHealthCenterCommandHandler,
  UpdateHealthCenterStatusCommandHandler,
} from './handlers';

export const healthCenterCommandHandlers = [
  CreateElasticHealthCenterCommandHandler,
  UpdateHealthCenterStatusCommandHandler,
];
