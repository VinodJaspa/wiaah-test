export * from './impl';
import {
  PostCreatedEventHandler,
  PostTaggedUsersEventHandler,
} from './handlers';

export const NewsfeedPostEventHandlers = [
  PostCreatedEventHandler,
  PostTaggedUsersEventHandler,
];
