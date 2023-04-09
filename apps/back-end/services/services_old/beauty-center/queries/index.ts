export * from './impl';
import {
  SearchFilteredBeautyCenterQueryHandler,
  GetBeautyCenterByIdQueryHandler,
} from './handlers';

export const BeautyCenterQueryHandlers = [
  SearchFilteredBeautyCenterQueryHandler,
  GetBeautyCenterByIdQueryHandler,
];
