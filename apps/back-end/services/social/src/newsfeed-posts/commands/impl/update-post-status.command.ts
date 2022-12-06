import { PostStatus } from 'prismaClient';

export class UpdatePostStatusCommand {
  constructor(
    public readonly postId: string,
    public readonly status: PostStatus,
  ) {}
}
