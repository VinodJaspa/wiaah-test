import { NewsfeedPost } from 'prismaClient';

export class PostCreatedEvent {
  constructor(
    public readonly post: NewsfeedPost,
    public readonly userId: string,
  ) {}
}
