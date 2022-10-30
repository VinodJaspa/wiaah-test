export * from './impl';
import {
  SearchLocalizationCommandHandler,
  SearchPlacesQueryHandler,
} from './handlers';

export const searchCommandHandlers = [
  SearchLocalizationCommandHandler,
  SearchPlacesQueryHandler,
];
