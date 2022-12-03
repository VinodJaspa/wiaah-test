export * from './impl';
import {
  SearchHealthCenterQueryHandler,
  GetHealthCenterByIdQueryHandler,
} from './handler';

export const HealthCenterQueryHandlers = [
  SearchHealthCenterQueryHandler,
  GetHealthCenterByIdQueryHandler,
];
