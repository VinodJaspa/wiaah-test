export * from './impl';
import { ActionMentionEventHandler, ActionTagsEventHandler } from './handlers';

export const ActionEventHandlers = [
  ActionMentionEventHandler,
  ActionTagsEventHandler,
];
