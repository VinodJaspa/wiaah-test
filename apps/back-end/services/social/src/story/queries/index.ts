export * from './impl';
import {
  GetRecentStoriesQueryHandler,
  ViewUserStoryQueryHandler,
  GetMyStoriesQueryHandler,
  GetStoryViewsQueryHandler,
  GetUserPrevStoryQueryHandler,
} from './handlers';

export const StoryQueryHandlers = [
  GetRecentStoriesQueryHandler,
  ViewUserStoryQueryHandler,
  GetMyStoriesQueryHandler,
  GetStoryViewsQueryHandler,
  GetUserPrevStoryQueryHandler,
];
