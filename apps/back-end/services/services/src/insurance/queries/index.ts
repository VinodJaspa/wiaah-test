export * from './impl';
import {
  GetServiceDataQueryHandler,
  GetInsurancesByStatusQueryHandler,
} from './handlers';

export const insuranceQueryHandler = [
  GetServiceDataQueryHandler,
  GetInsurancesByStatusQueryHandler,
];
