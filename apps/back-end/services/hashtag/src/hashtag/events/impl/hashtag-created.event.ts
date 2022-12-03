import { Hashtag } from '../../entities';

export class HashtagCreatedEvent {
  constructor(public tag: Hashtag) {}
}
