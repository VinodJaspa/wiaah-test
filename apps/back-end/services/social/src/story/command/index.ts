export * from './impl';
import {
  CreateStoryCommandHandler,
  LikeStoryCommandHandler,
  UpdateUserFollowerStoryLastSeenAtCommandHandler,
  DeleteStoryCommandHandler,
} from './handlers';

export const StoryCommandHandlers = [
  CreateStoryCommandHandler,
  LikeStoryCommandHandler,
  UpdateUserFollowerStoryLastSeenAtCommandHandler,
  DeleteStoryCommandHandler,
];
