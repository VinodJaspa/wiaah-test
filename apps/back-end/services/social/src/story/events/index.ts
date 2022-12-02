export * from './impl';
import {
  StoryViewedEventHandler,
  StoryCreatedEventHander,
  StoryMentionsEventHander,
} from './handlers';

export const storyEventHandlers = [
  StoryViewedEventHandler,
  StoryCreatedEventHander,
  StoryMentionsEventHander,
];
