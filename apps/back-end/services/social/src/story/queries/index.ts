export * from './impl';
import {
  GetRecentStoriesQueryHandler,
  ViewUserStoryQueryHandler,
} from './handlers';

export const StoryQueryHandlers = [
  GetRecentStoriesQueryHandler,
  ViewUserStoryQueryHandler,
];
