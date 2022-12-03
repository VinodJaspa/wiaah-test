import { Hashtag } from '../../entities';

export class HashtagDeletedEvent {
  constructor(public tag: Hashtag) {}
}
