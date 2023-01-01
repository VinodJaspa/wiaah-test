export * from './impl';
import {
  CreateInsuranceCommandHandler,
  UpdateInsuranceStatusCommandHandler,
} from './handlers';

export const insuranceCommandHandlers = [
  CreateInsuranceCommandHandler,
  UpdateInsuranceStatusCommandHandler,
];
